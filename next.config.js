const {i18n} = require('./next-i18next.config');

module.exports = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN ?? ''],
  },
  experimental: {
    externalDir: true,
  },
  i18n,
};
