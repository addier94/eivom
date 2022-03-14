/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'es'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = nextConfig;

// Don't delete this console log, useful to see the config app in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));
