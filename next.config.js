/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ['en-US', 'es'],
  //   defaultLocale: 'en-US',
  // },
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = nextConfig;

// Don't delete this console log, useful to see the config app in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));
