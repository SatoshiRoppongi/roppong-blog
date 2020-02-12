<template>
  <b-container>
    <div>
      <Profile />
    </div>
    <div class="mt-4">
      <b-card header="最近の投稿">
        <b-list-group flush>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#"
            >Dapibus ac facilisis in</b-list-group-item
          >
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <div class="mt-4">
      <b-card header="カテゴリー">
        <b-list-group flush>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#"
            >Dapibus ac facilisis in</b-list-group-item
          >
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <div class="mt-4">
      <b-card header="アーカイブ">
        <b-list-group flush>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#"
            >Dapibus ac facilisis in</b-list-group-item
          >
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <div class="mt-4">
      <b-card header="最近のコメント">
        <b-list-group flush>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#"
            >Dapibus ac facilisis in</b-list-group-item
          >
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import Profile from '@/components/profile.vue'
export default {
  components: {
    Profile
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
