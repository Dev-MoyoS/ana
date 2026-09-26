/** @type {import('next').NextConfig} */
const nextConfig = {
  // OneDrive/sync folders can break webpack persistent cache file renames (ENOENT),
  // cascading into "Cannot find module './xxx.js'" during dev.
  webpack: (config, { dev }) => {
    if (dev) {
      // OneDrive/sync folders can corrupt incremental builds and leave missing chunk files (e.g. ./331.js).
      config.cache = false;
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

