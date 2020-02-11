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
    <b-card>
      <article>
        <h1 class="card_title">{{ fields.title }}</h1>
        <p class="card_text">{{ id }}</p>
        <p class="card_date">{{ date }}</p>
      </article>
    </b-card>
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
