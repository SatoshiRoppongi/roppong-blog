// refs https://blog.cloud-acct.com/posts/blog-related-posts/
import { createClient } from '~/plugins/contentful'

const client = createClient()

export const state = () => ({
  posts: [],
  categories: [],
  postImages: [], // only profile face
  includes: {} // contains entry [] and Assets []
})

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  },
  setPostImages(state, payload) {
    state.postImages = payload
  },
  setIncludes(state, payload) {
    state.includes = payload
  }
}

export const actions = {
  // get blog posts and store
  async getPosts({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
      .then((res) => commit('setPosts', res.items))
      .catch(console.error)
  },

  // get blog categories and store
  async getCategories({ commit }) {
    await client
      .getEntries({
        content_type: 'category',
        order: '-sys.createdAt'
      })
      .then((res) => commit('setCategories', res.items))
      .catch(console.error)
  },

  // get blog post images and store
  // indeed its my face :-)
  async getPostImages({ commit }) {
    // todo: it should be more general way
    await client
      .getEntries({ 'sys.id': '6qL3UUnrtrcFIrF9znLpea' })
      .then((res) => commit('setPostImages', res.items))
      .catch(console.error)
  },

  async getIncludes({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID
      })
      .then((res) => commit('setIncludes', res.includes))
  }
}

export const getters = {
  // blogPostとカテゴリから必要なものをfilterしたものを返却
  navCategoryInfo(state) {
    return state.categories.map((category) => {
      return {
        title: category.fields.title,
        slug: category.fields.slug,
        definition: category.fields.definition,
        id: category.sys.id
      }
    })
  },
  // 投稿の概要データ配列を取得する。numは取得する個数
  postSummaries: (state) => (num) => {
    return state.posts.slice(0, num).map((post) => {
      return {
        title: post.fields.title,
        slug: post.fields.slug,
        createdAt: post.sys.createdAt
      }
    })
  },
  // slugから投稿を取得するgetter
  postFromSlug: (state) => (slug) => {
    return state.posts.find((post) => post.fields.slug === slug)
  },
  // 年月(yyyymm)で投稿を取得するgetter
  postFromMonth: (state) => (yyyymm) => {
    return state.posts.filter(
      (post) =>
        post.sys.createdAt
          .split('-')
          .splice(0, 2)
          .join('') === yyyymm
    )
  },
  // カテゴリslugから投稿を取得する
  postsFromCategorySlug: (state) => (slug) => {
    const entryInfo = state.includes.Entry.find(
      (entry) => entry.fields.slug === slug
    )
    if (entryInfo) {
      const searchId = entryInfo.sys.id
      return state.posts.filter(
        (post) => post.fields.category.sys.id === searchId
      )
    } else {
      return []
    }
  },

  // postオブジェクトから、アイキャッチイメージ, カテゴリ情報が付与されたオブジェクトを返却
  articleInfo: (state, getters) => (post) => {
    const article = post
    const imageInfo = article.fields.images
    if (imageInfo) {
      const eyeCatchImage = getters.eyeCatchImage(imageInfo.sys.id)
      article.eyeCatchImageUrl = eyeCatchImage.fields.file.url
    }
    const categoryInfo = article.fields.category
    if (categoryInfo) {
      const category = getters.category(article.fields.category.sys.id)
      article.categoryTitle = category.fields.title
      article.categorySlug = category.fields.slug
    }
    return article
  },
  // id からeyeCatch情報を取得する
  eyeCatchImage: (state) => (imageId) => {
    return state.includes.Asset.find((asset) => asset.sys.id === imageId)
  },

  // category id から、カテゴリを取得する
  category: (state) => (categoryId) => {
    return state.includes.Entry.find((entry) => entry.sys.id === categoryId)
  },

  // postをカテゴリIDで絞り込み返却
  postInCategory: (state) => (categoryId) => {
    return state.posts.filter((post) => {
      return post.fields.category.sys.id === categoryId
    })
  },

  // カテゴリに含まれる投稿数
  postCountInCategory: (state, getters) => (categoryId) => {
    return getters.postInCategory(categoryId).length
  },
  // navCategoryInfo (サイドバー用)
  navCategoryInfoWithCount(state, getters) {
    const categories = getters.navCategoryInfo
    for (const category of categories) {
      category.count = getters.postCountInCategory(category.id)
    }
    return categories
  },
  // 記事情報
  // アーカイブ情報 (サイドバー用)
  archives(state) {
    const archives = []
    const counts = {}
    const yyyymmList = state.posts.map((post) => {
      const yyyymm = post.sys.createdAt.split('-')
      return yyyymm[0] + yyyymm[1]
    })
    for (let i = 0; i < yyyymmList.length; i++) {
      const key = yyyymmList[i]
      counts[key] = counts[key] ? counts[key] + 1 : 1
    }
    for (const key in counts) {
      archives.push({
        title: key.substr(0, 4) + '年' + key.substr(4) + '月',
        slug: key,
        count: counts[key]
      })
    }
    return archives
  }
}
