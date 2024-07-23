ARG NODE_VERSION=18.19.0
ARG ALPINE_VERSION=3.18

#############################################################
# Stage 1 - App extraction / pruning                        #
#############################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as app-builder

RUN apk update && apk add build-base git \
    && apk add --no-cache g++ cairo-dev jpeg-dev pango-dev giflib-dev \
    && apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount

WORKDIR /app

COPY --link package.json turbo.json ./

# We can't run turbo without yarn install first, let's install locally and make sure
# both local and docker are aligned on the package.json version.
RUN TURBO_VERSION=$(cat package.json | jq '.devDependencies["turbo"]' -r) npm i -g turbo@${TURBO_VERSION}

COPY --link . .

# https://turbo.build/repo/docs/handbook/deploying-with-docker
RUN turbo prune --scope=blog-app --docker --out-dir=./out/blog-app/

#############################################################
# Stage 2 - App installation                                #
#############################################################

FROM app-builder as app-installer


WORKDIR /app

# First install the dependencies (as they change less often)
COPY --link .gitignore ./
COPY .npmrc ./

RUN npm install pnpm -g
RUN pnpm install


# Alternatively we can use a build cache (buildx)
#RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
#    YARN_CACHE_FOLDER=/root/.yarn3-cache \
#    yarn install --inline-builds

# Build the project
COPY --from=app-builder /app/out/blog-app/full/ .
COPY --link .gitignore turbo.json tsconfig.base.json ./

# RUN npm run migrations-generate-blog-app
RUN npm run build-blog-app

#############################################################
# Stage 3 - App runner                                      #
#############################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as app-runner


RUN apk add --no-cache tzdata bash && corepack enable

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

USER nextjs

COPY --from=app-installer --chown=nextjs:nodejs /app/apps/blog-app/next.config.js \
                    /app/apps/blog-app/package.json \
                    ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=app-installer --chown=nextjs:nodejs /app/apps/blog-app/.next/standalone ./
COPY --from=app-installer --chown=nextjs:nodejs /app/apps/blog-app/.next/static ./apps/blog-app/.next/static
COPY --from=app-installer --chown=nextjs:nodejs /app/apps/blog-app/public ./apps/blog-app/public


EXPOSE 4000

ENV PORT 4000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node apps/blog-app/server.js

