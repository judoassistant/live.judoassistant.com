<template>
  <section class="section">
    <h1 class="title">Players {{counter}}</h1>
    <b-table paginated :per-page=15 :data="players" :columns="columns"></b-table>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',
  data() {
    return {
      columns: [
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
        },
        {
          field: 'grade',
          label: 'Grade',
        },
        {
          field: 'club',
          label: 'Club',
        },
      ]
    }
  },
  computed: {
    players() {
      return this.$store.state.players
    },
    counter() {
      return this.$store.state.counter
    }
  },
  components: {
    Card
  }
}
</script>
