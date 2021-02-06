<template>
  <h2>Categories</h2>
  <Table :headers="headers" :rows="categories" v-slot="props">
    <TableColumn>
      <router-link class="menu-item" :to="{ name: 'tournament-category', params: { tournament: this.$route.params.tournament, categoryId: props.row.id }}">{{ props.row.name }}</router-link>
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
        { 'field': 'name', 'label': 'name', 'sortable': true },
      ],
    }
  },
  computed: {
    ...mapState({
      categories: state => Array.from(state.categories.values()),
    }),
  },
}
</script>

