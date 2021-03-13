<template>
  <main>
  <InfoText v-if="tournamentsState == 'NOT_LOADED'" icon="cloud-off-outline">Failed getting upcoming tournaments. Try again later!</InfoText>
  <InfoText v-if="tournamentsState == 'LOADING'" icon="loading" rotating>Loading list of tournaments..</InfoText>

  <template v-if="tournamentsState == 'LOADED'">
    <h1>Tournaments Overview</h1>
    <h2>Upcoming Tournaments</h2>
    <InfoText v-if="upcomingTournaments.length == 0">There are no upcoming tournaments.</InfoText>
    <Table v-if="upcomingTournaments.length > 0" :headers="upcomingHeaders" :rows="upcomingTournaments" v-slot="props" :pageSize=10>
      <TableColumn>
        <router-link :to="{ name: 'tournament-home', params: { tournament: props.row.webName }}">{{ props.row.name }}</router-link>
      </TableColumn>
      <TableColumn>
        {{ props.row.location }}
      </TableColumn>
      <TableColumn>
        {{ dateFilter(props.row.date) }}
      </TableColumn>
    </Table>
    <h2>Past Tournaments</h2>
    <InfoText v-if="pastTournaments.length == 0">There are no past tournaments.</InfoText>
    <Table v-if="pastTournaments.length > 0" :headers="pastHeaders" :rows="pastTournaments" v-slot="props" :pageSize=10>
      <TableColumn>
        <router-link :to="{ name: 'tournament-home', params: { tournament: props.row.webName }}">{{ props.row.name }}</router-link>
      </TableColumn>
      <TableColumn>
        {{ props.row.location }}
      </TableColumn>
      <TableColumn>
        {{ dateFilter(props.row.date) }}
      </TableColumn>
    </Table>
  </template>
  </main>
</template>

<script>
import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import InfoText from '@/components/InfoText.vue'
import { mapState } from 'vuex'
import { dateFilter } from '@/store/filters.js'

export default {
  components: { Table, TableColumn, InfoText },
  mounted: function() {
    this.$store.commit('setTournamentState', 'NOT_LOADED');
    this.$store.dispatch('fetchTournaments');
  },
  data() {
    return {
      upcomingHeaders: [
        { 'field': 'name', 'label': 'Name', 'sortable': false },
        { 'field': 'location', 'label': 'Location', 'sortable': false },
        { 'field': 'date', 'label': 'Date', 'sortable': true, 'defaultSort': 'ASC' },
      ],
      pastHeaders: [
        { 'field': 'name', 'label': 'Name', 'sortable': false },
        { 'field': 'location', 'label': 'Location', 'sortable': false },
        { 'field': 'date', 'label': 'Date', 'sortable': true, 'defaultSort': 'DESC' },
      ],
    }
  },
  methods: {
    dateFilter: dateFilter,
  },
  computed: {
    ...mapState({
      tournamentsState: state => state.tournamentsState,
      pastTournaments: state => state.pastTournaments,
      upcomingTournaments: state => state.upcomingTournaments,
    }),
  },
}
</script>

