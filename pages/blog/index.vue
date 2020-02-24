<template>
  <section class="index mt-4 text-center">
    <h1 class="posts_title">
      新着記事一覧
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
  asyncData({ env, params, route }) {
    const perPage = 2 // 1ページあたりの記事件数
    let pageNumber = 1
    if (typeof route.params.id !== 'undefined') {
      pageNumber = parseInt(route.params.id)
    }
    return client
      .getEntries()
      .then((entries) => {
        let posts = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'blogPost'
        )
        const itemTotal = posts.length
        posts = posts.slice(perPage * (pageNumber - 1), perPage * pageNumber)
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
        const categorizedPosts = posts.map((post) => {
          const category = categories.find(
            (category) => category.sys.id === post.fields.category.sys.id
          )
          post.categoryTitle = category.fields.title
          post.categorySlug = category.fields.slug
          return post
        })
        return { posts: categorizedPosts, pageNumber, perPage, itemTotal }
      })
      .catch(console.error)
  },
  methods: {
    linkGen(pageNumber) {
      return pageNumber === 1 ? '/blog/' : `/blog/page/${pageNumber}`
    }
  }
}
</script>
