<template>
  <div>
    <b-card tag="article" style="max-width: 20rem" class="text-center">
      <div class="mx-5">
        <b-card-img :src="imageUrl" alt="my face" top width="30" />
      </div>
      <div class="mt-1">
        <b-card-title title-tag="h2"> ろっぽん </b-card-title>
      </div>
      <b-card-text>
        都内でシステムエンジニアをしています。
        主にアウトプットの練習として、こちらのブログで自由気ままに発言していきます。
        内容は主にランニング・筋トレ・暗号通貨・日記・その他雑記です。
      </b-card-text>
      <div class="my-3">
        <b-list-group horizontal>
          <b-list-group-item href="https://github.com/SatoshiRoppongi">
            <b-img-lazy
              src="~/static/GitHub-Mark-120px-plus.png"
              width="50"
              height="50"
              fluid
              alt="github logo"
          /></b-list-group-item>
          <b-list-group-item href="https://www.strava.com/athletes/43984091">
            <b-img-lazy
              src="~/static/Strava_logo.png"
              width="50"
              height="50"
              fluid
              alt="strava logo"
          /></b-list-group-item>
          <b-list-group-item href="https://www.youtube.com/user/s6hori">
            <b-img-lazy
              src="~/static/youtube_social_circle_dark.png"
              width="50"
              height="50"
              fluid
              alt="youtube logo"
            />
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-button href="/blog/profile" variant="primary"
        >詳細プロフィールはこちら</b-button
      >
    </b-card>
  </div>
</template>
<script>
export default {
  computed: {
    imageUrl() {
      const imgUrl = this.$store.state.postImages[0].fields.image.fields.file
        .url
      const imgAdjust = '?fit=thumb&f=top_left&h=200&w=200&r=180'
      return 'https:' + imgUrl + imgAdjust
    },
  },
}
</script>
