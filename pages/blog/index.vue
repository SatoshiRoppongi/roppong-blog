<template>
  <section class="index mt-4 text-center">
    <h1 class="posts_title">
      新着記事一覧
    </h1>
    <card v-for="post in posts" :key="post.sys.id" :item="post" />
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
  asyncData({ env, params }) {
    return client
      .getEntries()
      .then((entries) => {
        const posts = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'blogPost'
        )
        const categories = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'category'
        )
        const categorizedPosts = posts.map((post) => {
          const category = categories.find(
            (category) => category.sys.id === post.fields.category.sys.id
          )
          post.categoryTitle = category.fields.title
          post.categorySlug = category.fields.slug
          return post
        })
        return { posts: categorizedPosts }
      })
      .catch(console.error)
  }
}
</script>
