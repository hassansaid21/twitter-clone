import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or '20mb'
    },
  },
  serverExternalPackages: ['mariadb', '@prisma/adapter-mariadb'],
};

export default nextConfig;
