<template>
  <section class="index">
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
import { createClient } from '@/plugins/contentful'

const client = createClient()
export default {
  transition: 'slide-left',
  components: {
    Card
  },
  asyncData({ env, params }) {
    return client
      .getEntries(env.CTF_BLOG_POST_TYPE_ID)
      .then((entries) => {
        console.log('here')
        return {
          posts: entries.items.filter(
            (item) => item.sys.contentType.sys.id === 'blogPost'
          )
        }
      })
      .catch(console.error)
  }
}
</script>
