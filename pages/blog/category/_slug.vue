<template>
  <section class="category">
    <h1 class="category_title">
      {{ article[0].fields.title }}
    </h1>
    <!--
    <p class="slug_date">{{ article.sys.updatedAt }}</p>
    <div>
      {{ article.fields.body.content[0].content[0].value }}
    </div>
    -->
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
    console.log('params')
    console.log(params)
    return client
      .getEntries(env.CTF_BLOG_POST_TYPE_ID)
      .then((entries) => {
        return {
          article: entries.items.filter(
            (article) => article.fields.slug === params.slug
          )
        }
      })
      .catch(console.error)
  }
}
</script>
