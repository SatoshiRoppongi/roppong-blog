<template>
  <section class="slug">
    <h1 class="slug_title">
      {{ article.fields.title }}
    </h1>
    <div v-html="$md.render(article.fields.body)"></div>
    <p class="slug_date">{{ article.sys.updatedAt }}</p>
  </section>
</template>
<script>
import { createClient } from '~/plugins/contentful'

const client = createClient()
export default {
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
        return {
          article: entries.items.find(
            (article) => article.fields.slug === params.slug
          )
        }
      })
      .catch(console.error)
  }
}
</script>
