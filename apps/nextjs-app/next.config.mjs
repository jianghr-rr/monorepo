/** @type {import('next').NextConfig} */
import path from 'node:path';
import url from 'node:url';
import nextI18nConfig from './next-i18next.config.mjs';
import { buildEnv } from './src/config/build-env.config.mjs';

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  '..',
  '..'
);

const nextConfig = {
  i18n: nextI18nConfig.i18n,

  experimental: {
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
    ...(buildEnv.NEXT_BUILD_ENV_OUTPUT === 'standalone'
      ? { outputFileTracingRoot: workspaceRoot }
      : {}),

    // Useful in conjunction with to `output: 'standalone'` and `outputFileTracing: true`
    // to keep lambdas sizes / docker images low when vercel/nft isn't able to
    // drop unneeded deps for you. ie: esbuil-musl, swc-musl... when not actually needed
    //
    // Note that yarn 3+/4 is less impacted thanks to supportedArchitectures.
    // See https://yarnpkg.com/configuration/yarnrc#supportedArchitectures and
    // config example in https://github.com/belgattitude/nextjs-monorepo-example/pull/3582
    // NPM/PNPM might adopt https://github.com/npm/rfcs/pull/519 in the future.
    //
    // Caution: use it with care because you'll have to maintain this over time.
    //
    // How to debug in vercel: set NEXT_DEBUG_FUNCTION_SIZE=1 in vercel env, then
    // check the last lines of vercel build.
    //
    // Related issue: https://github.com/vercel/next.js/issues/42641

    // Caution if using pnpm you might also need to consider that things are hoisted
    // under node_modules/.pnpm/<something variable>. Depends on version
    //
    // outputFileTracingExcludes: {
    //  '*': [
    //    '**/node_modules/@swc/core-linux-x64-gnu/**/*',
    //    '**/node_modules/@swc/core-linux-x64-musl/**/*',
    //    // If you're nor relying on mdx-remote... drop this
    //    '**/node_modules/esbuild/linux/**/*',
    //    '**/node_modules/webpack/**/*',
    //    '**/node_modules/terser/**/*',
    //    // If you're not relying on sentry edge or any weird stuff... drop this too
    //    // https://github.com/getsentry/sentry-javascript/pull/6982
    //    '**/node_modules/rollup/**/*',
    //  ],
    // },

    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },

  typescript: {
    ignoreBuildErrors: !buildEnv.NEXT_BUILD_ENV_TYPECHECK,
    tsconfigPath: buildEnv.NEXT_BUILD_ENV_TSCONFIG,
  },

  eslint: {
    ignoreDuringBuilds: !buildEnv.NEXT_BUILD_ENV_LINT,
    // dirs: [`${__dirname}/src`],
  },
};

export default nextConfig;
