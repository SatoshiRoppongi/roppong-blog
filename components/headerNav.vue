<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand aria-label="ホームへ" to="/blog"
        ><Homeicon
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="item in navBarCategoryMenu"
            :key="item.slug"
            :to="{
              name: 'blog-category-slug',
              params: { slug: item.slug },
            }"
          >
            <b>
              {{ item.title }}
            </b>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/blog/about"><b>このブログについて</b></b-nav-item>
          <b-nav-item to="/blog/contact"><b>お問い合わせ</b></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import Homeicon from '@/components/homeicon.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Homeicon,
  },
  computed: {
    ...mapGetters({
      navBarCategoryMenu: 'navCategoryInfo',
    }),
  },
}
</script>
