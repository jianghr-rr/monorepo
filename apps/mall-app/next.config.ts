import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://www.curlyhair.cn:8080/mmall/:path*', // 替换为后端 URL
        // destination: 'http://localhost:8080/:path*', // 替换为后端 URL
      },
    ];
  },
};

export default nextConfig;
