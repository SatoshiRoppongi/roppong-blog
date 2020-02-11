<template>
  <div>
    <header>
      <b-card
        overlay
        img-src="https://picsum.photos/900/100/?image=1021&blur=2"
        img-alt="Header Image"
        text-variant="black"
        title="roppong blog"
        sub-title="ろっぽんぶろぐ"
        bg-variant="red"
      >
        <b-card-text>
          日々のアイデア・考えていることをアウトプットする
        </b-card-text>
      </b-card>
      <HeaderNav />
    </header>
  </div>
</template>
<script>
import HeaderNav from '@/components/headerNav.vue'
export default {
  components: {
    HeaderNav
  }
}
</script>
