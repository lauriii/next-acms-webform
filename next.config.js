module.exports = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN ?? ''],
  },
  experimental: {
    externalDir: true,
  },
};
