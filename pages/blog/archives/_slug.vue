<template>
  <section class="category">
    <h1 class="category_title my-5">{{ yearMonth }} の投稿</h1>
    <card v-for="post in posts" :key="post.sys.id" :item="post" />
  </section>
</template>
<script>
import Card from '@/components/card.vue'
import { createClient } from '~/plugins/contentful'
import { getLastDay } from '~/plugins/myutil'

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
    // YYYYMM を 年 月 に分解する
    const year = params.slug.substr(0, 4)
    const month = params.slug.substr(4)

    return client
      .getEntries({
        content_type: 'blogPost',
        'sys.createdAt[gte]': [year, month, '01'].join('-'),
        'sys.createdAt[lte]': [year, month, getLastDay(year, month)].join('-'),
        order: '-sys.createdAt'
      })
      .then((posts) => {
        return {
          yearMonth: year + '年' + month + '月',
          posts: posts.items
        }
      })
      .catch(console.error)
  }
}
</script>
