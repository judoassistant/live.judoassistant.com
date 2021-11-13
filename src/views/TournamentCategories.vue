<template>
  <h2>Categories</h2>
  <InfoText v-if="categories.length == 0">This tournament has no categories yet.</InfoText>
  <Table v-if="categories.length > 0" :headers="headers" :rows="categories" v-slot="props">
    <TableColumn>
      <router-link class="menu-item" :to="{ name: 'tournament-category', params: { tournament: this.$route.params.tournament, categoryId: props.row.id }}">{{ props.row.name }}</router-link>
    </TableColumn>
  </Table>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import InfoText from '@/components/InfoText.vue'
import { mapState } from 'vuex'
import { lexicographicalComparator } from '@/store/helpers.js'

export default {
  components: { Table, TableColumn, InfoText },
  data() {
    return {
      headers: [
        { 'field': 'name', 'label': 'name', 'sortable': true, 'comparator': lexicographicalComparator  },
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

