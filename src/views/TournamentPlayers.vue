<template>
  <h2>Players</h2>
  <Table :headers="headers" :rows="players" v-slot="props">
    <TableColumn>
      <router-link class="menu-item" :to="{ name: 'tournament-player', params: { tournament: this.$route.params.tournament, playerId: props.row.id }}">{{ props.row.firstName }}</router-link>
    </TableColumn>
    <TableColumn>
      {{ props.row.lastName }}
    </TableColumn>
    <TableColumn>
      {{ props.row.club }}
    </TableColumn>
  </Table>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import { mapState } from 'vuex'

export default {
  components: { Table, TableColumn },
  data() {
    return {
      headers: [
        { 'field': 'firstName', 'label': 'First Name', 'sortable': true },
        { 'field': 'lastName', 'label': 'Last Name', 'sortable': true },
        { 'field': 'club', 'label': 'Club', 'sortable': false },
      ],
    }
  },
  computed: {
    ...mapState({
      players: state => Array.from(state.players.values()),
    }),
  },
}
</script>

