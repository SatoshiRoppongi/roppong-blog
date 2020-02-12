<template>
  <div>
    <b-card tag="article" style="max-width: 20rem;" class="text-center">
      <div class="mx-5">
        <b-card-img :src="imageurl" alt="my face" top width="30" />
      </div>
      <div class="mt-1">
        <b-card-title>
          ろっぽん
        </b-card-title>
      </div>
      <b-card-text>
        都内でシステムエンジニアをしています
      </b-card-text>
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
        console.log('sysentries')
        console.log(entries)
        this.imageurl =
          'https:' +
          entries.items[0].fields.image.fields.file.url +
          '?fit=thumb&f=top_left&h=200&w=200&r=180'
      })
      .catch(console.error)
  }
}
</script>
