<template>
  <main>
    <h1>Tournament Overview</h1>
    <h2>Upcoming Tournaments</h2>
    <Table :data="tournaments" :fields="fields" v-slot="props">
      <td><a href="#">{{ props.row.name }}</a></td>
      <td>{{ props.row.location }}</td>
      <td>{{ props.row.date }}</td>
    </Table>
    <h2>Previous Tournaments</h2>
  </main>
</template>

<script>
import Table from '@/components/Table.vue'
import { mapState } from 'vuex'

export default {
  components: { Table },
  mounted: function() {
    this.$store.dispatch('fetchTournaments')
  },
  computed: {
    ...mapState({
      loading: state => state.tournamentsState,
      tournaments: state => state.tournaments,
    }),
  },
  data: function() {
    return {
      /* data: [ */
      /*   { */
      /*     id: 1, */
      /*     name: "Ungdomsturnering Fredericia", */
      /*     loc: "Fredericia", */
      /*     dat: "Saturday, October 24, 2020", */
      /*   }, */
      /*   { */
      /*     id: 2, */
      /*     name: "Ungdomsturnering Korsør", */
      /*     loc: "Korsør", */
      /*     dat: "Saturday, October 24, 2020", */
      /*   }, */
      /*   { */
      /*     id: 3, */
      /*     name: "Ungdomsturnering Skive", */
      /*     loc: "Skive", */
      /*     dat: "Saturday, October 17, 2020", */
      /*   }, */
      /* ], */
      fields: [
        { field: 'name', label: 'Name'},
        { field: 'loc', label: 'Location'},
        { field: 'dat', label: 'Date'},
      ]
    }
  },
}
</script>
