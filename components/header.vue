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
            <h1>roppong blog</h1>
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
    HeaderNav,
  },
}
</script>
<style scoped>
html {
  background: #ccd0d4;
}
h1 {
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 3.375em;
  color: transparent;
  letter-spacing: 0.1em;
  text-shadow: 0 0 2px rgba(204, 208, 212, 0.9), 0 15px 25px rgba(0, 0, 0, 0.3),
    0 -2px 3px rgba(0, 0, 0, 0.1), 0 -5px 10px rgba(255, 255, 255, 0.5),
    0 5px 10px rgba(0, 0, 0, 0.3), 0 3px 4px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(255, 255, 255, 0.45);
}
a:hover {
  text-decoration: none;
}
</style>
