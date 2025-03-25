/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable production source maps for better error tracking
  productionBrowserSourceMaps: true,
  // Configure image domains for use with remote images
  images: {
    domains: [
      'localhost',
      'supabase.co',
      'cloudflare-ipfs.com',
      'images.unsplash.com',
      'brknfleerzqbynhhuyel.supabase.co', // Add your Supabase project domain
    ],
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
  },
  // SVGR configuration
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 