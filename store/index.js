// refs https://blog.cloud-acct.com/posts/blog-related-posts/
import { createClient } from '~/plugins/contentful'

const client = createClient()

export const state = () => ({
  posts: [],
  categories: [],
  postImages: [] // only profile face
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
  // カテゴリに含まれる投稿数
  postCountInCategory: (state) => (categoryId) => {
    return state.posts.filter((post) => {
      return post.fields.category.sys.id === categoryId
    }).length
  },
  // navCategoryInfo (サイドバー用)
  navCategoryInfoWithCount(state, getters) {
    const categories = getters.navCategoryInfo
    for (const category of categories) {
      category.count = getters.postCountInCategory(category.id)
    }
    return categories
  },
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
