<template>
  <section class="section">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
        <li class="is-active"><a href="#" aria-current="page">{{ tournament.name }}</a></li>
      </ul>
    </nav>
    <h1 class="title">{{ tournament.name }}</h1>
    <h2 class="subtitle">Overview</h2>
  </section>
</template>

<script>
export default {
  name: 'Tournament',
  computed: {
    tournament() {
      return this.$store.state.tournament;
    },
  },
  components: {
  },
  methods: {
  }
}
</script>

