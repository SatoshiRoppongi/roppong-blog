import { getConfigForKeys } from './lib/config.js'
import { createClient } from './plugins/contentful'
import { PERPAGE } from './plugins/myutil'

const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])
const cdaClient = createClient(ctfConfig)
const domain = process.env.BASE_URL.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]

export default {
  mode: 'universal',
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
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/node_modules/highlight.js/styles/hopscotch.css', lang: 'css' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/contentful', '~/plugins/disqus', '~/plugins/markdownit'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    '~/plugins/hook', // pluginsセクションではなく、ここ？
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-143514276-1'
      }
    ],
    [
      '@nuxtjs/google-adsense',
      {
        id: process.env.GA_ADSENSE_ID,
        pageLevelAds: true,
        analyticsUacct: process.env.GA_TRACKING_ID, // アナリティクスと連携する場合のみ必要
        analyticsDomainName: domain // アナリティクスと連携する場合のみ必要
      }
    ]
  ],
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
    extend(config, ctx) {}
  },
  generate: {
    routes() {
      return cdaClient
        .getEntries(ctfConfig.CTF_BLOG_POST_TYPE_ID)
        .then((entries) => {
          // 記事
          const postPathList = entries.items.map(
            (entry) => `/blog/${entry.fields.slug}`
          )
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
                ...Array(categoryPageCount).keys()
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
            .map((post) =>
              post.sys.createdAt
                .split('-')
                .slice(0, 2)
                .join('')
            )
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
            // ...basePagePathList,
            // ...categoryPagePathList,
            ...archivePagePathList,
            ...miscPathList
          ]
        })
    }
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  },
  router: {
    // 現在Nuxt.jsのバグでページ内アンカーリンク付きのURLを直接開いた際にその位置にスクロールしない
    // バグの暫定的な対処:https://isoppp.com/note/2018-06-20/add1-nuxt-firebase-blog-markdown-process/
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (
          to.matched.some((r) => r.components.default.options.scrollToTop)
        ) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://roppong.com',
    cacheTime: 1000 * 60 * 15,
    routes() {
      return cdaClient
        .getEntries(ctfConfig.CTF_BLOG_POST_TYPE_ID)
        .then((entries) => {
          // 記事
          const postPathList = entries.items.map(
            (entry) => `/blog/${entry.fields.slug}`
          )
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
                ...Array(categoryPageCount).keys()
              ].map((i) => `/blog/category/${categoryPath}/page/${i + 1}`)
              return { categoryPath, categoryPagePathList }
            })
          const categoryPathList = categoryList.map(
            (category) => category.categoryPath
          )

          // アーカイブ
          const yyyymmList = allPosts
            .map((post) =>
              post.sys.createdAt
                .split('-')
                .slice(0, 2)
                .join('')
            )
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
            ...miscPathList
          ]
        })
    }
  }
}
