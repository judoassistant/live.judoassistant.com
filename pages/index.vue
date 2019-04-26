<template>
  <section class="section">
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
            <li class="is-active"><a href="#" aria-current="page">Tournaments Listing</a></li>
          </ul>
        </nav>

      <h1 class="title">JudoAssistant</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'frontpage',
  computed: {
  },
  components: {
  },
  methods: {
  }
}
</script>
