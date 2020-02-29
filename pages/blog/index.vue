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
      :link-gen="linkGen"
      :number-of-pages="Number(itemTotal / perPage)"
      use-router
      pills
      size="lg"
      align="center"
      class="my-5"
    >
    </b-pagination-nav>
  </section>
</template>

<script>
import Card from '@/components/card.vue'
import { createClient } from '@/plugins/contentful'

const client = createClient()
export default {
  transition: 'slide-left',
  components: {
    Card
  },
  data() {
    return {
      currentPage: 'newPosts', // 新着記事
      currentCategory: '' // currentPageがcategoryの時のみ使用
    }
  },
  asyncData({ env, params, route }) {
    const perPage = 2 // 1ページあたりの記事件数
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
    return client
      .getEntries()
      .then((entries) => {
        // 投稿記事を抽出する
        let posts = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'blogPost'
        )
        // カテゴリを抽出する
        const categories = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'category'
        )
        posts = posts.map((post) => {
          if (post.fields.images) {
            const eyeCatchImage = entries.includes.Asset.find(
              (asset) => asset.sys.id === post.fields.images.sys.id
            )
            post.eyeCatchImageUrl = eyeCatchImage.fields.file.url
          }
          return post
        })
        posts = posts.map((post) => {
          const category = categories.find(
            (category) => category.sys.id === post.fields.category.sys.id
          )
          post.categoryTitle = category.fields.title
          post.categorySlug = category.fields.slug
          return post
        })
        // ページ種別がカテゴリならば、カテゴリで投稿の絞り込み行う。
        let categoryTitle = ''
        if (currentPage === 'category') {
          categoryTitle = categories.find(
            (category) => category.fields.slug === currentCategory
          ).fields.title
          posts = posts.filter((post) => post.categorySlug === currentCategory)
        }
        // ページ種別がアーカイブならば、アーカイブの年月で投稿の絞り込みを行う。
        if (currentPage === 'archive') {
          posts = posts.filter(
            (post) =>
              post.sys.createdAt
                .split('-')
                .slice(0, 2)
                .join('') === yyyymm
          )
        }
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
      })
      .catch(console.error)
  },
  methods: {
    linkGen(pageNumber) {
      // todo:ここもページタイプによって可変に
      let link = ''
      if (this.currentPage === 'newPosts') {
        link = pageNumber === 1 ? '/blog/' : `/blog/page/${pageNumber}`
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
