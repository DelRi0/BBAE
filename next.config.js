module.exports = {
  i18n: {
    locales: ["en-US", "zh-TW"],
    defaultLocale: "en-US",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.node = {
      fs: "empty",
    }
    return config
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
}
