<template>
  <main>
    <template v-if="tournamentsState == 'NOT_LOADED'">
      <p style='text-align: center;'>not loaded....</p>
    </template>
    <template v-if="tournamentsState == 'LOADING'">
      <p style='text-align: center;'>loading....</p>
    </template>
    <template v-if="tournamentsState == 'LOADED'">
      <h1>Tournaments Overview</h1>
      <h2>Upcoming Tournaments</h2>
      <Table :data="tournaments" :fields="fields" v-slot="props">
        <td><router-link :to="{ name: 'tournament', params: { tournament: props.row.webName }}">{{ props.row.name }}</router-link></td>
        <td>{{ props.row.location }}</td>
        <td>{{ props.row.date }}</td>
      </Table>
      <h2>Previous Tournaments</h2>
    </template>
  </main>
</template>

<script>
import Table from '@/components/Table.vue'
import { mapState } from 'vuex'

export default {
  components: { Table },
  mounted: function() {
    this.$store.commit('setTournamentState', 'NOT_LOADED');
    this.$store.dispatch('fetchTournaments');
  },
  computed: {
    ...mapState({
      tournamentsState: state => state.tournamentsState,
      tournaments: state => state.tournaments,
    }),
  },
  data: function() {
    return {
      fields: [
        { field: 'name', label: 'Name'},
        { field: 'loc', label: 'Location'},
        { field: 'dat', label: 'Date'},
      ]
    }
  },
}
</script>

