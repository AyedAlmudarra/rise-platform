import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['brknfleerzqbynhhuyel.supabase.co'],
  },
};

export default nextConfig;
