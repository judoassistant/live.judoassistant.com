<template>
  <InfoText v-if="!hasPlayers">This tournament has no players yet.</InfoText>

  <template v-if="hasPlayers">
    <h2>Players</h2>

    <Input v-model="searchTerm" placeholder="Search" />
    <Table :headers="headers" :rows="players" v-slot="props">
      <TableColumn>
        <router-link
          :to="{ name: 'tournament-player', params: { tournament: this.$route.params.tournament, playerId: props.row.id } }"
          class="menu-item"
        >{{ props.row.firstName }}</router-link>
      </TableColumn>
      <TableColumn>{{ props.row.lastName }}</TableColumn>
      <TableColumn>{{ props.row.club }}</TableColumn>
    </Table>
    <InfoText v-if="players.length === 0">No players found</InfoText>
  </template>
</template>

<script>
import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import InfoText from '@/components/InfoText.vue'
import Input from '@/components/Input.vue'
import { mapState } from 'vuex'

export default {
  components: { Table, TableColumn, InfoText, Input },
  data() {
    return {
      searchTerm: "",
      headers: [
        { 'field': 'firstName', 'label': 'First Name', 'sortable': true },
        { 'field': 'lastName', 'label': 'Last Name', 'sortable': true },
        { 'field': 'club', 'label': 'Club', 'sortable': true },
      ],
    }
  },
  computed: {
    ...mapState({
      hasPlayers: state => state.players.size >= 1,
      players: function (state) {
        const searchTerm = this.searchTerm
        return Array.from(state.players.values()).filter(p => {
          if (searchTerm === "") return true

          //People doesnt always know the fightes full name
          //So if just one of the names mathces, we are happy
          const names = `${p.firstName} ${p.lastName}`.toLowerCase().split(" ")
          const words = searchTerm.split(" ")

          return names.some(n => words.some(w => w && n.startsWith(w.toLowerCase())))
        })
      },
    }),
  }
}
</script>

