<template>
  <section class="category mt-4 text-center">
    <h1 class="category_title">
      <span style="color:blue">{{ category.fields.title }}</span
      >に関する記事 <b-badge pill>{{ posts.length }}件</b-badge>
    </h1>
    <card v-for="post in posts" :key="post.sys.id" :item="post" />
  </section>
</template>
<script>
import Card from '@/components/card.vue'
import { createClient } from '~/plugins/contentful'

const client = createClient()
export default {
  components: {
    Card
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  transition: 'slide-right',
  asyncData({ env, params }) {
    return client
      .getEntries(env.CTF_BLOG_POST_TYPE_ID)
      .then((entries) => {
        const category = entries.items.find(
          (entry) => entry.fields.slug === params.slug
        )
        const accessableEntries = entries.items.filter(
          (entry) => entry.fields.category
        )
        const posts = accessableEntries.filter(
          (entry) => entry.fields.category.sys.id === category.sys.id
        )
        return {
          category,
          posts
        }
      })
      .catch(console.error)
  }
}
</script>
