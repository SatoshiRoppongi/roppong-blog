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
    Sidebar
  }
  /* ,
  mounted() {
    console.log('test')
    console.log(this.$route.path)
  }
  */
}
</script>

<style>
/*
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*/
/*
.main {
  width: calc(100% - 300px);
  background: #fcc;
  margin-bottom: 10px;
}
.side {
  background: #fea;
  width: 300px;
}

.main,
.side {
  padding: 2%;
  border-radius: 10px;
}
@media (min-width: 600px) {
  .flexbox {
    margin: 0 auto;
    display: flex;
    max-width: 1080px;
  }
  .main {
    margin: 0 10px 0 0;
  }
}
*/
</style>
