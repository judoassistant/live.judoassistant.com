<template>
  <h2>Categories</h2>
  <Table :data="players" :fields="fields" v-slot="props">
    <td>{{ props.row.firstName }}</td>
    <td>{{ props.row.lastName }}</td>
    <td>{{ props.row.club }}</td>
  </Table>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import Table from '@/components/Table.vue'
import { mapState } from 'vuex'

export default {
  components: { Table },
  computed: {
    ...mapState({
      players: state => state.players,
    }),
  },
  data: function() {
    return {
      fields: [
        { field: 'firstName', label: 'First Name'},
        { field: 'lastName', label: 'Last Name'},
        { field: 'club', label: 'Club'},
      ]
    }
  },
}
</script>

