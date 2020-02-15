<template>
  <b-container>
    <div class="mt-4">
      <Profile />
    </div>
    <!-- todo:v-forを使ってもっと簡略化する -->
    <div v-for="card in cards" :key="card.title" class="mt-4">
      <b-card :header="card.title">
        <b-list-group flush>
          <b-list-group-item
            v-for="item in card.body"
            :key="item.slug"
            :to="{
              name: card.pathName,
              params: { slug: item.slug }
            }"
            class="d-flex justify-content-between align-items-center"
            >{{ item.title }}
            <b-badge v-if="item.count" variant="primary" pill>
              {{ item.count }}
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import Profile from '@/components/profile.vue'
import { createClient } from '~/plugins/contentful'

const client = createClient()
export default {
  components: {
    Profile
  },
  data() {
    return {
      cards: [
        { title: '最近の投稿', pathName: 'blog-slug', body: [] },
        { title: 'カテゴリ', pathName: 'blog-category-slug', body: [] },
        { title: 'アーカイブ', pathName: 'blog-archives-slug', body: [] },
        { title: '最近のコメント', pathName: 'blog-slug', body: [] }
      ]
    }
  },
  async mounted() {
    /* 最近の投稿 */
    const POST_MAX_ENTRY = 5 // 投稿表示件数（取得件数)
    const recentPost = await client
      .getEntries({
        content_type: 'blogPost',
        order: '-sys.createdAt',
        limit: POST_MAX_ENTRY
      })
      .then((entries) => {
        return entries.items.map((entry) => {
          return {
            title: entry.fields.title,
            slug: entry.fields.slug,
            createdAt: entry.sys.createdAt
          }
        })
      })
      .catch(console.error)
    this.cards[0].body = recentPost

    /* カテゴリ */
    const category = await client
      .getEntries({
        content_type: 'category'
      })
      .then((entries) => {
        return entries.items.map((entry) => {
          return {
            title: entry.fields.title,
            slug: entry.fields.slug
          }
        })
      })
    this.cards[1].body = category
    /* アーカイブ */
    // const archives =
    const archives = await client
      .getEntries({
        content_type: 'blogPost',
        order: '-sys.createdAt'
      })
      .then((entries) => {
        const yearMonthList = []
        let postCount = 0
        let prevPostYearMonth = ''
        let yearMonth = ''
        let yyyymm = ''
        for (const post of entries.items) {
          const dateSplited = post.sys.createdAt.split('-')
          yearMonth = dateSplited[0] + '年' + dateSplited[1] + '月'
          yyyymm = dateSplited[0] + dateSplited[1]
          if (yearMonth === prevPostYearMonth || prevPostYearMonth === '') {
            postCount++
          } else {
            yearMonthList.push({
              title: yearMonth,
              slug: yyyymm,
              count: postCount
            })
            postCount = 0
            prevPostYearMonth = yearMonth
          }
        }
        yearMonthList.push({
          title: yearMonth,
          slug: yyyymm,
          count: postCount
        })
        return yearMonthList
      })
    this.cards[2].body = archives
    // const COMMENT_MAX_ENTRY = 5 // コメント表示件数
  }
}
</script>

<style>
.sidebar {
  background-color: #191970;
  height: 100%; /* サイドバーの高さ */
  opacity: 0.9.5; /* 透過する 0に近くほど透過する */
  /* position: fixed; /* 要素を固定する(スクロールしても位置は固定される) */
  overflow-x: hidden; /* 横軸ではみ出た要素を非表示にする */
  box-sizing: border-box; /* paddingとborderを、widthとheightに含める */
  padding-left: 40px; /* サイドバー内のリンクの位置を右にずらす */
}

.sidebar-link-area {
  padding-top: 20px; /* サイドバーリンクの上部に空白を作る */
}

.sidebar-link {
  color: #ffffff; /* リンクの文字色を白に */
}

.sidebar-link:hover {
  color: #ffffff; /* マウスがリンクに乗った時も文字色を白に */
}
</style>
