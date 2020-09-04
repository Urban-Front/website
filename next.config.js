// next.config.js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const withSass = require('@zeit/next-sass')
const withPurgeCss = require('next-purgecss')

require('dotenv').config()

// With purge css
const prodConfig = withPlugins(
  [withTM],
  withSass(
    withPurgeCss({
      target: 'serverless',
      distDir: '.next',
      env: {
        CONTENTFUL_SPACE:
          process.env.CONTENTFUL_SPACE,
        CONTENTFUL_TOKEN:
          process.env.CONTENTFUL_TOKEN,
        CONTENTFUL_PREVIEW_TOKEN:
          process.env.CONTENTFUL_PREVIEW_TOKEN
      },
      purgeCssPaths: [
        'src/pages/**/*',
        'src/components/**/*',
        'src/svg/**/*'
      ],
      purgeCss: {
        whitelist: () => [
          'swiper',
          'swiper-container',
          'swiper-container-fade',
          'swiper-container-initialized',
          'swiper-container-horizontal',
          'swiper-wrapper',
          'swiper-slide',
          'swiper-slide-duplicate',
          'swiper-slide-active',
          'swiper-slide-next',
          'swiper-slide-prev',
          'swiper-slide-duplicate-next',
          'swiper-slide-duplicate-prev',
          'swiper-button-next',
          'swiper-button-prev',
          'swiper-button-disabled',
          'swiper-lazy-preloader',
          'swiper-lazy',
          'swiper-lazy-loaded',
          'page-transition-enter',
          'page-transition-enter-active',
          'page-transition-exit',
          'page-transition-exit-active'
        ]
      }
    })
  )
)

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
