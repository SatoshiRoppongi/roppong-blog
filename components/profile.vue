<template>
  <div>
    <b-card tag="article" style="max-width: 20rem;" class="text-center">
      <div class="mx-5">
        <b-card-img-lazy :src="imageurl" alt="my face" top width="30" />
      </div>
      <div class="mt-1">
        <b-card-title>
          ろっぽん
        </b-card-title>
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
          /></b-list-group-item>
          <b-list-group-item href="https://www.strava.com/athletes/43984091">
            <b-img-lazy
              src="~/static/Strava_logo.png"
              width="50"
              height="50"
              fluid
          /></b-list-group-item>
          <b-list-group-item href="https://www.youtube.com/user/s6hori">
            <b-img-lazy
              src="~/static/youtube_social_circle_dark.png"
              width="50"
              height="50"
              fluid
            />
          </b-list-group-item>
        </b-list-group>
      </div>
      <b-button href="#" variant="primary">詳細プロフィールはこちら</b-button>
    </b-card>
  </div>
</template>
<script>
import { createClient } from '@/plugins/contentful'

const client = createClient()
export default {
  data() {
    return {
      imageurl: ''
    }
  },
  async mounted() {
    await client
      .getEntries({ 'sys.id': '6qL3UUnrtrcFIrF9znLpea' })
      .then((entries) => {
        this.imageurl =
          'https:' +
          entries.items[0].fields.image.fields.file.url +
          '?fit=thumb&f=top_left&h=200&w=200&r=180'
      })
      .catch(console.error)
  }
}
</script>
