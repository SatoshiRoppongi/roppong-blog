<template>
  <b-container>
    <div class="mt-4">
      <Profile />
    </div>
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
    const categories = await client
      .getEntries({
        content_type: 'category'
      })
      .then((entries) => {
        return entries.items.map((entry) => {
          return {
            title: entry.fields.title,
            slug: entry.fields.slug,
            id: entry.sys.id
          }
        })
      })
    for (const category of categories) {
      const postCount = await client
        .getEntries({
          content_type: 'blogPost'
        })
        .then((posts) => {
          return posts.items.filter((entry) => {
            return entry.fields.category.sys.id === category.id
          }).length
        })
      category.count = postCount
    }
    this.cards[1].body = categories
    /* アーカイブ */
    const archives = await client
      .getEntries({
        content_type: 'blogPost',
        order: '-sys.createdAt'
      })
      .then((entries) => {
        const yyyymm = entries.items.map((item) => {
          const yearMonthSplited = item.sys.createdAt.split('-')
          return yearMonthSplited[0] + yearMonthSplited[1]
        })
        const archives = []
        const counts = {}
        for (let i = 0; i < yyyymm.length; i++) {
          const key = yyyymm[i]
          counts[key] = counts[key] ? counts[key] + 1 : 1
        }
        for (const key in counts) {
          archives.push({
            title: key.substr(0, 4) + '年' + key.substr(4) + '月',
            slug: key,
            count: counts[key]
          })
        }
        return archives
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
