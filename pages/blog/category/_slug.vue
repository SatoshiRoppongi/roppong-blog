<template>
  <section class="category">
    <h1 class="category_title">
      {{ category.fields.title }}
    </h1>
    <card
      v-for="(post, i) in posts"
      :key="i"
      :fields="post.fields"
      :id="post.sys.id"
      :date="post.sys.updatedAt"
    />
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
        console.log('entries')
        console.log(entries.items)
        const posts = entries.items.filter(
          (entry) => entry.fields.category.sys.id === category.sys.id
        )
        console.log(' posts')
        console.log(posts)
        return {
          category,
          posts
        }
      })
      .catch(console.error)
  }
}
</script>
