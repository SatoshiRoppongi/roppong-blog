<template>
  <nuxt-link
    :to="{
      name: 'blog-slug',
      params: {
        slug: fields.slug
      }
    }"
    class="wrapper"
  >
    <article class="card">
      <h1 class="card_title">{{ fields.title }}</h1>
      <p class="card_text">{{ id }}</p>
      <p class="card_date">{{ date }}</p>
    </article>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    fields: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  }
}
</script>
