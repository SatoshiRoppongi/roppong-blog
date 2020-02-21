<template>
  <section class="slug my-5">
    <h1 class="slug_title text-center">
      {{ article.fields.title }}
    </h1>
    <div v-html="$md.render(article.fields.body)" class="post-content"></div>
    <p class="slug_date">{{ article.sys.updatedAt }}</p>
    <div class="comments">
      <vue-disqus
        :identifier="'post/' + article.fields.title"
        :url="'http://roppong.com/blog/' + article.fields.slug"
        shortname="roppong"
      ></vue-disqus>
    </div>
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
<style lang="scss" scoped>
/deep/ h1 {
  color: #364e96; /*文字色*/
  padding: 0.5em 0; /*上下の余白*/
  border-top: solid 3px #364e96; /*上線*/
  border-bottom: solid 3px #364e96; /*下線*/
}

/deep/ .post-content {
  padding: 0 0 15px;
  position: relative;
  z-index: 1;
  > * {
    position: relative;
    z-index: 10; // h2のpadding部分より前面に来るように
  }
  .table-of-contents {
    background: #f3f3f3;
    border: 1px solid #ccc;
    padding: 5px 10px;
    width: fit-content;
    ul {
      padding-left: 24px;
    }
    &:before {
      content: '目次';
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
