// next.config.js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const withSass = require('@zeit/next-sass')

require('dotenv').config()

// With purge css
const prodConfig = withPlugins(
  [withTM],
  withSass({
    target: 'serverless',
    distDir: '.next',
    env: {
      CONTENTFUL_SPACE:
        process.env.CONTENTFUL_SPACE,
      CONTENTFUL_TOKEN:
        process.env.CONTENTFUL_TOKEN,
      CONTENTFUL_PREVIEW_TOKEN:
        process.env.CONTENTFUL_PREVIEW_TOKEN
    }
  })
);

const devConfig = withPlugins(
  [withTM],
  {
    target: 'serverless',
    distDir: '.next',
    env: {
      CONTENTFUL_SPACE:
        process.env.CONTENTFUL_SPACE,
      CONTENTFUL_TOKEN:
        process.env.CONTENTFUL_TOKEN,
      CONTENTFUL_PREVIEW_TOKEN:
        process.env.CONTENTFUL_PREVIEW_TOKEN
    }
  }
)

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
