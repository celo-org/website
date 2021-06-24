const withImages = require('next-images')
const envConfig = require('./env-config')
const serverEnvConfig = require('./server-env-config')
const { i18n } = require("./next-i18next.config")
module.exports = withImages({
  i18n,
  inlineImageLimit: 1024,
  future: {
    webpack5: true,
  },
  images: {
    domains: ["images.ctfassets.net", "i.ytimg.com", "*.ytimg.com"],
  },
  experimental: {
    modern: false,
  },
  publicRuntimeConfig: envConfig,
  serverRuntimeConfig: serverEnvConfig,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public; max-age=60, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: "/api/bytes",
        headers: [
          {
            key: "Cache-Control",
            value: "private; max-age=0",
          },
        ],
      },
      {
        source: "/api/:any*",
        headers: [
          {
            key: "Cache-Control",
            value: "public; max-age=60, stale-while-revalidate=600",
          },
        ],
      },
    ]
  },
  // options: {buildId, dev, isServer, defaultLoaders, webpack}   https://nextjs.org/docs#customizing-webpack-config
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native$": "react-native-web",
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http: false, // webpack5 no longer polyfills node packages
      https: false, // network-speed requires this but only on node, in browser it does not so no poly
    }

    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser"
    }

    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: "raw-loader",
          options: {
            esModule: false,
          },
        },
      ],
    })

    config.module.rules.push({
      loader: "ignore-loader",
      test: /\.test.ts$/,
    })

    return config
  },
})
