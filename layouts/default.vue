<template>
  <div>
    <nuxt v-if="this.$route.path === '/'" class="landing" />
    <div v-else class="blog">
      <Header />
      <b-container>
        <b-row class="main">
          <b-col cols="12" md="8">
            <main>
              <nuxt />
            </main>
          </b-col>
          <b-col md="4">
            <Sidebar />
          </b-col>
        </b-row>
      </b-container>
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Sidebar from '@/components/sidebar.vue'

export default {
  components: {
    Header,
    Footer,
    Sidebar,
  },
}
</script>

<style></style>
