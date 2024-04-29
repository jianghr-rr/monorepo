/** @type {import('next').NextConfig} */

const nextConfig = {
  assetPrefix: process.env.ASSET_PREFIX || 'http://localhost:4001', // 子应用的资源路径，
  //   reactStrictMode: true,
  //   swcMinify: true,
  //   crossOrigin: 'anonymous',
  //   webpack: (
  //     config,
  //     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  //   ) => {
  //     // Important: return the modified config
  //     config.webpack = {
  //       ...config.webpack,
  //       output: {
  //         library: `${packageName}-[name]`,
  //         libraryTarget: 'umd',
  //         chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  //       },
  //     };
  //     return config;
  //   },
  async headers() {
    return [
      {
        source: '/(.*)', // 适用所有路由
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *;", // 允许 iframe 加载
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
