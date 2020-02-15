<template>
  <section class="category">
    <h1 class="category_title">
      {{ yearMonth }}
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
    // YYYYMM を 年 月 に分解する
    console.log('params')
    console.log(params)
    const year = params.slug.substr(0, 4)
    const month = params.slug.substr(4)

    // 年と月からその月の最終月を返す関数
    const getLastDay = (year, month) => {
      const lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)

      if (isLeap && month === 2) {
        return 29
      } else {
        return lastDays[month - 1]
      }
    }

    return client
      .getEntries({
        content_type: 'blogPost',
        'sys.createdAt[gte]': [year, month, '01'].join('-'),
        'sys.createdAt[lte]': [year, month, getLastDay(year, month)].join('-'),
        order: '-sys.createdAt'
      })
      .then((posts) => {
        console.log('yyyymm')
        console.log(posts)
        return {
          yearMonth: year + '年' + month + '月',
          posts: posts.items
        }
      })
      .catch(console.error)
  }
}
</script>
