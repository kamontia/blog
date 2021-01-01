import colors from 'vuetify/es5/util/colors'
const { createClient } = require('./src/plugins/contentful.js')

const { getConfigForKeys } = require('./src/lib/config.js')
const CMSConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
])

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  generate: {
    routes() {
      let client = createClient()
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        }),
        client.getEntries({
          content_type: 'category',
        }),
        client.getEntries({
          content_type: 'tag',
        }),
      ]).then(([posts, categories, tags]) => {
        return [
          ...posts.items.map((post) => {
            return {
              route: `/posts/${post.fields.slug}`,
              payload: post,
            }
          }),
          ...categories.items.map((category) => {
            return {
              route: `/categories/${category.fields.slug}`,
              payload: category,
            }
          }),
          ...tags.items.map((tag) => {
            return {
              route: `/tags/${tag.fields.slug}`,
              payload: tag,
            }
          }),
        ]
      })
    },
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - なんちって',
    title: 'なんちってエンジニアの備忘録',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/global.css',
    {
      src: '@/../node_modules/highlight.js/styles/atom-one-light.css',
      lang: 'css',
    },
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '@/plugins/convert_date' }, { src: '@plugins/components' }],

  router: {
    middleware: ['getContentful'],
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#e20074',
          secondary: '#6c757d',
          accent: '#3ea2fb',
          error: '#dc3545',
          petrol: '#17a499',
          background: '#fff',
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  srcDir: 'src',
  server: {
    host: '0.0.0.0',
  },
  env: {
    CTF_SPACE_ID: CMSConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: CMSConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: CMSConfig.CTF_BLOG_POST_TYPE_ID,
  },
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    // highlight: function (str, lang) {
    //   if (lang && hljs.getLanguage(lang)) {
    //     try {
    //       return hljs.highlight(lang, str).value;
    //     } catch (__) { }
    //   }

    //   return ''; // use external default escaping
    // },
    highlightjs: (str, lang) => {
      const hljs = require('highlight.js')
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs111"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          )
        } catch (__) {}
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return (
        '<pre class="hljs"><code>' +
        hljs.highlight('plaintext', str, true).value +
        '</code></pre>'
      )
    },
    use: [
      'markdown-it-meta',
      'markdown-it-highlightjs',
      'markdown-it-table-of-contents',
      'markdown-it-anchor',
    ],
  },
}
