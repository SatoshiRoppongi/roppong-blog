import { getConfigForKeys } from './lib/config.js'
import { createClient } from './plugins/contentful'
import { PERPAGE } from './plugins/myutil'

const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
])
const cdaClient = createClient(ctfConfig)
const domain = process.env.BASE_URL.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]

export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [
      {
        /* The core Firebase JS SDK is always required and must be listed first */
        src: '/__/firebase/7.19.0/firebase-app.js',
        body: true,
      },
      {
        /* TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries */
        src: '/__/firebase/7.19.0/firebase-analytics.js',
        body: true,
      },
      {
        src: '/__/firebase/7.24.0/firebase-functions.js',
        body: true,
      },
      {
        /* Initialize Firebase */
        src: '/__/firebase/init.js',
        body: true,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/node_modules/highlight.js/styles/hopscotch.css', lang: 'css' },
    // '~/assets/scss/app.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/disqus',
    '~/plugins/markdownit',
    /* '~/plugins/firebase', */
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: 'UA-143514276-1',
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // ['bootstrap-vue/nuxt', { css: false }],
    ['bootstrap-vue/nuxt'],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    '~/plugins/hook', // pluginsセクションではなく、ここ？
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-adsense',
      {
        id: process.env.GA_ADSENSE_ID,
        pageLevelAds: false,
        analyticsUacct: process.env.GA_TRACKING_ID, // アナリティクスと連携する場合のみ必要
        analyticsDomainName: domain, // アナリティクスと連携する場合のみ必要
      },
    ],
  ],
  bootstrapVue: {
    components: [
      'BCard',
      'BBadge',
      'BCardTitle',
      'BCardImgLazy',
      'BCardText',
      'BButton',
      'BCardBody',
      'BNavbar',
      'BNavbarBrand',
      'BCollapse',
      'BNavItem',
      'BNavbarNav',
      'BNavbarToggle',
      'BListGroup',
      'BListGroupItem',
      'BContainer',
      'BRow',
      'BCol',
      'BJumbotron',
      'BForm',
      'BFormGroup',
      'BFormInput',
      'BFormTextarea',
      'BAlert',
      'BPagination-Nav',
      'BImg',
      'BImgLazy',
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config) {
      const vueLoader = config.module.rules.find(
        (rule) => rule.loader === 'vue-loader'
      )
      vueLoader.options.transformAssetUrls = {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
        'b-img': 'src',
        'b-img-lazy': ['src', 'blank-src'],
        'b-card': 'img-src',
        'b-card-img': 'img-src',
        'b-card-img-lazy': ['src', 'blank-src'],
        'b-carousel-slide': 'img-src',
        'b-embed': 'src',
      }
    },
    babel: {
      compact: true,
    },
  },
  generate: {
    routes() {
      return cdaClient
        .getEntries(ctfConfig.CTF_BLOG_POST_TYPE_ID)
        .then((entries) => {
          // 記事
          const postPathList = entries.items
            .filter((item) => item.sys.contentType.sys.id === 'blogPost')
            .map((entry) => `/blog/${entry.fields.slug}`)
          // 記事一覧ページ(ページネーション対応)
          // 全ての記事ページの数
          const allPosts = entries.items.filter(
            (item) => item.sys.contentType.sys.id === 'blogPost'
          )
          /*
          const allPostCount = allPosts.length
          // ページ数
          const basePageCount = Math.ceil(allPostCount / PERPAGE)
          const basePagePathList = [...Array(basePageCount).keys()].map(
            (i) => `/blog/page/${i + 1}`
          )
          */
          // カテゴリ
          const categoryList = entries.items
            .filter((item) => item.sys.contentType.sys.id === 'category')
            .map((category) => {
              const categoryPostCount = entries.items.filter(
                (post) =>
                  typeof post.fields.category !== 'undefined' &&
                  post.fields.category.sys.id === category.sys.id
              ).length
              const categoryPageCount = Math.ceil(categoryPostCount / PERPAGE)
              const categoryPath = `/blog/category/${category.fields.slug}`
              const categoryPagePathList = [
                ...Array(categoryPageCount).keys(),
              ].map((i) => `/blog/category/${categoryPath}/page/${i + 1}`)
              return { categoryPath, categoryPagePathList }
            })
          const categoryPathList = categoryList.map(
            (category) => category.categoryPath
          )

          // カテゴリ(ページネーション対応)
          /*
          const categoryPagePathList = categoryList
            .map((category) => category.categoryPagePathList)
            .flat()
          */
          // アーカイブ
          const yyyymmList = allPosts
            .map((post) => post.sys.createdAt.split('-').slice(0, 2).join(''))
            .filter((elem, index, self) => self.indexOf(elem) === index)
          const archivePagePathList = yyyymmList.map(
            (yyyymm) => `/blog/archive/${yyyymm}`
          )
          // アーカイブ(ページネーション対応) 使用予定なし
          // その他ページ
          const miscPathList = ['/blog/about', '/blog/contact']
          return [
            '/blog',
            ...postPathList,
            ...categoryPathList,
            // ...basePagePathList,
            // ...categoryPagePathList,
            ...archivePagePathList,
            ...miscPathList,
          ]
        })
    },
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID,
  },
  router: {
    middleware: ['getContentful'],
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.roppong.com',
    cacheTime: 1000 * 60 * 15,
    routes() {
      return cdaClient
        .getEntries(ctfConfig.CTF_BLOG_POST_TYPE_ID)
        .then((entries) => {
          // 記事
          const postPathList = entries.items
            .filter((item) => item.sys.contentType.sys.id === 'blogPost')
            .map((entry) => `/blog/${entry.fields.slug}`)
          // 記事一覧ページ(ページネーション対応)
          // 全ての記事ページの数
          const allPosts = entries.items.filter(
            (item) => item.sys.contentType.sys.id === 'blogPost'
          )
          // カテゴリ
          const categoryList = entries.items
            .filter((item) => item.sys.contentType.sys.id === 'category')
            .map((category) => {
              const categoryPostCount = entries.items.filter(
                (post) =>
                  typeof post.fields.category !== 'undefined' &&
                  post.fields.category.sys.id === category.sys.id
              ).length
              const categoryPageCount = Math.ceil(categoryPostCount / PERPAGE)
              const categoryPath = `/blog/category/${category.fields.slug}`
              const categoryPagePathList = [
                ...Array(categoryPageCount).keys(),
              ].map((i) => `/blog/category/${categoryPath}/page/${i + 1}`)
              return { categoryPath, categoryPagePathList }
            })
          const categoryPathList = categoryList.map(
            (category) => category.categoryPath
          )

          // アーカイブ
          const yyyymmList = allPosts
            .map((post) => post.sys.createdAt.split('-').slice(0, 2).join(''))
            .filter((elem, index, self) => self.indexOf(elem) === index)
          const archivePagePathList = yyyymmList.map(
            (yyyymm) => `/blog/archive/${yyyymm}`
          )
          // アーカイブ(ページネーション対応) 使用予定なし
          // その他ページ
          const miscPathList = ['/blog/about', '/blog/contact']
          return [
            ...postPathList,
            ...categoryPathList,
            ...archivePagePathList,
            ...miscPathList,
          ]
        })
    },
  },
}
