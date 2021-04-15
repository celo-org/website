const withImages = require('next-images')
const envConfig = require('./env-config')
const serverEnvConfig = require('./server-env-config')

module.exports = withImages({
  future: {
    webpack5: true
  },
  images: {
    domains: ['images.ctfassets.net', "i.ytimg.com", "*.ytimg.com"],
  },
  experimental: {
    modern: false,
  },
  publicRuntimeConfig: envConfig,
  serverRuntimeConfig: serverEnvConfig,
  reactStrictMode: true,

  // options: {buildId, dev, isServer, defaultLoaders, webpack}   https://nextjs.org/docs#customizing-webpack-config
  webpack: (config, { isServer }) => {

    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "http": false, // webpack5 no longer polyfills node packages
      "https": false // network-speed requires this but only on node, in browser it does not so no poly
    }

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
      ],
    })

    config.module.rules.push({
      loader: 'ignore-loader',
      test: /\.test.ts$/,
    })

    return config
  },
})
