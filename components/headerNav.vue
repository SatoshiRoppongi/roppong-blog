<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/blog"><Homeicon /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item v-for="item in navBarMenu" :key="item.slug" :to="item.to"> -->
          <b-nav-item
            v-for="item in navBarCategoryMenu"
            :key="item.slug"
            :to="{
              name: 'blog-category-slug',
              params: { slug: item.slug }
            }"
          >
            {{ item.name }}
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/blog/about">このブログについて</b-nav-item>
          <b-nav-item to="/blog/contact">お問い合わせ</b-nav-item>

          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="ブログ内検索"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >検索</b-button
            >
          </b-nav-form>

          <!--
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import Homeicon from '@/components/homeicon.vue'
import { createClient } from '~/plugins/contentful'

const client = createClient()
export default {
  components: {
    Homeicon
  },
  data() {
    return {
      navBarCategoryMenu: []
    }
  },
  async mounted() {
    await client
      .getEntries({
        content_type: 'category',
        order: 'fields.sort'
      })
      .then((entries) => {
        const categories = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'category'
        )
        this.navBarCategoryMenu.push(
          ...categories.map((category) => {
            return {
              name: category.fields.title,
              slug: category.fields.slug
            }
          })
        )
      })
      .catch(console.error)
  }
}
</script>
