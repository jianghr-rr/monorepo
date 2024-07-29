const path = require('path');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      require('@mapbox/rehype-prism'), // 使用rehype-prism插件来处理代码高亮
    ],
    remarkPlugins: [
      async () => {
        const remarkGfm = await import('remark-gfm');
        return remarkGfm.default;
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-international', 'international-types'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thecocktaildb.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
      canvas: 'commonjs canvas',
    });
    // config.externals.push('canvas');
    config.resolve.alias.canvas = false;
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    // console.log('???', path.join(__dirname, 'components/ui'));
    // config.resolve.alias['~ui'] = path.join(__dirname, 'components/ui');

    return config;
  },
};

module.exports = withMDX(nextConfig);
