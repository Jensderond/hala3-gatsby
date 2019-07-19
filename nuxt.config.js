const fs = require("fs");
const builtAt = new Date().toISOString()
const path = require('path')
const { I18N } = require('./locales/i18n-nuxt-config')
const blogsNl = fs.readdirSync('./contents/nl/blog').map((x) => x.slice(0, -3));

const productionUrl = {
  nl: "/nl",
};
const baseUrl = 'https://www.hala3.nl';

module.exports = {
  env: {
    baseUrl,
    productionUrl,
    blogsNl
  },
  head: {
    title: 'Hala 3 | Kampioensteam uit Tholen 🍺⚽',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'theme-color', content: '#ffdd57' },
      { name: 'robots', content: 'index, follow' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@tholenseboys' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt },
      { property: 'og:image', content: 'https://www.hala3.nl/images/teamfoto_wanbeleid.jpg' },
      { property: 'og:image:width', content: '960' },
      { property: 'og:image:height', content: '637' },
      { property: 'og:image:alt', content: 'Teamfoto Hala 3' },
      { property: 'og:description', content: 'Tholense boys 3, een team vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA 3!', hid: 'description' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-384x384.png', sizes: '384x384' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
      // { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'mask-icon', type: 'image/png', href: '/favicons/safari-pinned-tab.svg', color: '#c1c1c1' },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#ffdd57',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  css: [
    'normalize.css/normalize.css',
    '@/assets/css/main.scss'
  ],

  build: {
    extend(config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          vue: {
            root: "dynamicMarkdown"
          }
        }
      }, {
          test: /\.(jpe?g|png)$/i,
          loader: 'responsive-loader',
          options: {
            placeholder: true,
            quality: 60,
            size: 1400,
            adapter: require('responsive-loader/sharp')
          }
        }, {
          test: /\.(gif|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 1000,
            name: 'img/[name].[hash:7].[ext]'
          }
        });
    }
  },
  plugins: ['~/plugins/lazyload', '~/plugins/globalComponents'],
  modules: [
    '@nuxtjs/style-resources',
    ['nuxt-i18n', I18N],
    'nuxt-webfontloader',
    ['@nuxtjs/google-analytics', {
      id: 'UA-49648465-10',
      set: [
        { field: 'anonymizeIp', value: true }
      ],
    }]
  ],

  styleResources: {
    scss: [
      '@/assets/css/utilities/_variables.scss',
      '@/assets/css/utilities/_helpers.scss',
      '@/assets/css/base/_grid.scss',
      '@/assets/css/base/_buttons.scss'
    ],
  },

  webfontloader: {
    custom: {
      families: ['Graphik', 'Tiempos Headline'],
      urls: ['/fonts/fonts.css']
    }
  },

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  generate: {
    routes: [].concat(blogsNl.map(w => `/blog/${w}`))
  }
}
