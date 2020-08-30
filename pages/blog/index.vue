<template>
  <section class="index mt-4 text-center">
    <h1 class="posts_title">
      <span v-if="currentPage === 'newPosts'"> 新着記事一覧 </span>
      <span v-if="currentPage === 'category'">
        <span style="color:blue"> {{ categoryTitle }} </span>に関する記事
        <b-badge pill>{{ itemTotal }}件</b-badge>
      </span>
      <span v-if="currentPage === 'archive'">
        <span style="color:blue"> {{ yearMonth }} </span>の投稿
        <b-badge pill>{{ itemTotal }}件</b-badge>
      </span>
    </h1>
    <card v-for="post in posts" :key="post.sys.id" :item="post" />
    <b-pagination-nav
      v-if="itemTotal >= perPage"
      :link-gen="linkGen"
      :number-of-pages="Math.ceil(itemTotal / perPage)"
      use-router
      pills
      size="lg"
      align="center"
      class="my-5"
      role="navigation"
    >
      <a role="menuitem"></a>
    </b-pagination-nav>
    <template>
      <adsbygoogle ad-slot="7309254084" />
    </template>
  </section>
</template>

<script>
import Card from '@/components/card.vue'
import { PERPAGE } from '@/plugins/myutil'

export default {
  transition: 'slide-left',
  components: {
    Card
  },
  head() {
    return {
      title: 'roppong blog のトップページ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '趣味のランニング・日々勉強になったこと・面白いと思ったことを中心に、みなさまのお役に立つかもしれない情報を発信しています。'
        }
      ]
    }
  },
  data() {
    return {
      currentPage: 'newPosts', // 新着記事
      currentCategory: '' // currentPageがcategoryの時のみ使用
    }
  },
  asyncData({ env, params, route, store }) {
    const perPage = PERPAGE // 1ページあたりの記事件数
    let pageNumber = 1
    if (typeof route.params.id !== 'undefined') {
      pageNumber = parseInt(route.params.id)
    }
    const pathSplited = route.path.split('/')
    let currentPage = 'newPosts'
    if (typeof pathSplited[2] !== 'undefined' && pathSplited[2] !== 'page') {
      currentPage = pathSplited[2]
    }
    const currentCategory = currentPage === 'category' ? pathSplited[3] : ''
    const yyyymm = currentPage === 'archive' ? pathSplited[3] : ''
    let yearMonth = ''
    let year = ''
    let month = ''
    if (yyyymm !== '') {
      year = yyyymm.substr(0, 4)
      month = yyyymm.substr(4)
      yearMonth = `${year}年${month}月`
    }
    let posts = store.state.posts
    const categories = store.state.categories
    // ページ種別がカテゴリならば、カテゴリで投稿の絞り込み行う。
    let categoryTitle = ''
    if (currentPage === 'category') {
      categoryTitle = categories.find(
        (category) => category.fields.slug === currentCategory
      ).fields.title
      posts = store.getters.postsFromCategorySlug(currentCategory)
      console.log(posts)
      // ページ種別がアーカイブなら、アーカイブで投稿の絞り込みを行う
    } else if (currentPage === 'archive') {
      posts = store.getters.postFromMonth(yyyymm)
    }
    posts = posts.map((post) => {
      return store.getters.articleInfo(post)
    })

    const itemTotal = posts.length
    posts = posts.slice(perPage * (pageNumber - 1), perPage * pageNumber)
    return {
      posts,
      pageNumber,
      perPage,
      itemTotal,
      currentPage,
      currentCategory,
      categoryTitle,
      yearMonth,
      yyyymm
    }
  },
  methods: {
    linkGen(pageNumber) {
      let link = ''
      if (this.currentPage === 'newPosts') {
        link = pageNumber === 1 ? '/blog' : `/blog/page/${pageNumber}`
      } else if (this.currentPage === 'category') {
        link =
          pageNumber === 1
            ? `/blog/category/${this.currentCategory}`
            : `/blog/category/${this.currentCategory}/page/${pageNumber}`
      } else if (this.currentPage === 'archive') {
        link =
          pageNumber === 1
            ? `/blog/archive/${this.yyyymm}`
            : `/blog/archive/${this.yyyymm}/page/${pageNumber}`
      }
      return link
    }
  }
}
</script>
