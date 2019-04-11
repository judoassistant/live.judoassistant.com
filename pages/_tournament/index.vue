<template>
  <section class="section">
    <h1 class="title">{{ tournamentName }}</h1>
    <h2 class="subtitle">Overview</h2>
  </section>
</template>

<script>
export default {
  name: 'Tournament',
  computed: {
    tournamentName() {
      return this.$store.state.tournament.name;
    },
  },
  components: {
  },
  methods: {
  }
}
</script>

