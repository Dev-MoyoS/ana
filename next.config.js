/** @type {import('next').NextConfig} */
const nextConfig = {
  // OneDrive/sync folders can break webpack persistent cache file renames (ENOENT),
  // cascading into "Cannot find module './xxx.js'" during dev.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;

