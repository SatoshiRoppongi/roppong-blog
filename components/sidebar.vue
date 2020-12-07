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
              params: { slug: item.slug },
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
    <template>
      <adsbygoogle ad-slot="7309254084" />
    </template>
  </b-container>
</template>
<script>
import Profile from '@/components/profile.vue'

export default {
  components: {
    Profile,
  },
  computed: {
    cards() {
      /* 最近の投稿 */
      const POST_MAX_ENTRY = 5 // 投稿表示件数（取得件数)
      const recentPost = this.$store.getters.postSummaries(POST_MAX_ENTRY)
      const categories = this.$store.getters.navCategoryInfoWithCount
      const archives = this.$store.getters.archives
      return [
        { title: '最近の投稿', pathName: 'blog-slug', body: recentPost },
        { title: 'カテゴリ', pathName: 'blog-category-slug', body: categories },
        { title: 'アーカイブ', pathName: 'blog-archive-slug', body: archives },
        // { title: '最近のコメント', pathName: 'blog-slug', body: [] }
      ]
    },
  },
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
