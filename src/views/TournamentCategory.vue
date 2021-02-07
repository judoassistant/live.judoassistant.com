<template>
  <template v-if="categoryState == 'NOT_LOADED'">
    <p style='text-align: center;'>not loaded....</p>
  </template>
  <template v-if="categoryState == 'LOADING'">
    <p style='text-align: center;'>loading....</p>
  </template>
  <template v-if="categoryState == 'LOADED'">
    <h2>{{ category.name }}</h2>
    <Tabs>
      <TabItem title="Players" selected="true">
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
      </TabItem>
      <TabItem title="Matches">
        <p>Hello from Matches tab</p>
      </TabItem>
      <TabItem title="Results">
        <p>Hello from Results tab</p>
      </TabItem>
    </Tabs>
  </template>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState } from 'vuex'
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'

export default {
  components: { Tabs, TabItem, },
  data() {
    return {
      headers: [
        { 'field': 'firstName', 'label': 'First Name', 'sortable': true },
        { 'field': 'lastName', 'label': 'Last Name', 'sortable': true },
        { 'field': 'club', 'label': 'Club', 'sortable': false },
      ],
    }
  },
  mounted: function() {
    console.log("Loading ", this.$route.params.categoryId);
    this.$store.dispatch('subscribeCategory', this.$route.params.categoryId);
  },
  computed: {
    ...mapState({
      categoryState: state => state.categoryState,
      category: state => state.category,
      players: state => state.players,
    }),
  },
}
</script>

