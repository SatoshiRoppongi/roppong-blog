<template>
  <section class="slug">
    <h1 class="slug_title">
      {{ article.fields.title }}
    </h1>
    <p class="slug_date">{{ article.sys.updatedAt }}</p>
    <div v-html="toHtmlString(article.fields.body)"></div>
  </section>
</template>
<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
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
  },
  methods: {
    toHtmlString(obj) {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: ({
            data: {
              target: { fields }
            }
          }) => `<img src="${fields.file.url}"/>`
        }
      }
      return documentToHtmlString(obj, options)
    }
  }
}
</script>
