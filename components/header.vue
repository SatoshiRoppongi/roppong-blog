<template>
  <div>
    <header>
      <b-card
        bg-variant="dark"
        text-variant="white"
        class="text-center rounded-0"
      >
        <b-card-body>
          <nuxt-link to="/blog">
            <b-img-lazy src="~/static/logo.png" fluid alt="roppong.com logo">
            </b-img-lazy>
          </nuxt-link>
        </b-card-body>
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
