<template>
  <h2>Players</h2>
  <Table :rows="players" v-slot="props">
    <TableColumn label='First Name' field='firstName'>
      <router-link class="menu-item" :to="{ name: 'tournament-player', params: { tournament: this.$route.params.tournament, playerId: props.row.id }}">{{ props.row.firstName }}</router-link>
    </TableColumn>
    <TableColumn label='Last Name' field='lastName'>
      {{ props.row.lastName }}
    </TableColumn>
    <TableColumn label='Club' field='club'>
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
  computed: {
    ...mapState({
      players: state => state.players,
    }),
  },
}
</script>

