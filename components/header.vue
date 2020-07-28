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
            <b-img src="~/static/logo.png"> </b-img>
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
