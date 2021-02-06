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
      <Table :headers="headers" :rows="tournaments" v-slot="props">
        <TableColumn>
          <router-link :to="{ name: 'tournament-home', params: { tournament: props.row.webName }}">{{ props.row.name }}</router-link>
        </TableColumn>
        <TableColumn>
          {{ props.row.location }}
        </TableColumn>
        <TableColumn>
          {{ props.row.date }}
        </TableColumn>
      </Table>
      <h2>Previous Tournaments</h2>
    </template>
  </main>
</template>

<script>
import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import { mapState } from 'vuex'

export default {
  components: { Table, TableColumn },
  mounted: function() {
    this.$store.commit('setTournamentState', 'NOT_LOADED');
    this.$store.dispatch('fetchTournaments');
  },
  data() {
    return {
      headers: [
        { 'field': 'name', 'label': 'Name', 'sortable': true },
        { 'field': 'location', 'label': 'Location', 'sortable': true },
        { 'field': 'date', 'label': 'Date', 'sortable': false },
      ],
    }
  },
  computed: {
    ...mapState({
      tournamentsState: state => state.tournamentsState,
      tournaments: state => Array.from(state.tournaments.values()),
    }),
  },
}
</script>

