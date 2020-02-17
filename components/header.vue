<template>
  <div>
    <header>
      <b-card
        bg-variant="dark"
        text-variant="white"
        title="roppong blog"
        class="text-center rounded-0"
      >
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
