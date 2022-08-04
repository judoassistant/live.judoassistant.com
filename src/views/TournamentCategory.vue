<template>
  <InfoText v-if="categoryState == 'NOT_LOADED'" icon="cloud-off-outline">Category not found. The category does not exist.</InfoText>
  <InfoText v-if="categoryState == 'LOADING'" icon="loading" rotating>Loading category..</InfoText>
  <template v-if="categoryState == 'LOADED'">
    <h2>{{ category.name }}</h2>
    <Tabs>
      <TabItem title="Players" selected="true">
        <InfoText v-if="players.length == 0">This category has no players.</InfoText>
        <Table v-if="players.length > 0" :headers="playerTableHeaders" :rows="players" v-slot="props">
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
        <template v-if="category.matchesHidden">
          <InfoText>The matches in this category are hidden.</InfoText>
        </template>
        <template v-else>
          <InfoText v-if="matches.length == 0">This category has no matches yet.</InfoText>

          <MatchCard v-for="match in matches" :key="mapId(match.combinedId)" :match="match"></MatchCard>
        </template>
      </TabItem>
      <TabItem title="Results">
        <InfoText v-if="results.length == 0">This category has no results yet.</InfoText>
        <Table v-if="results.length > 0" :headers="resultsTableHeaders" :rows="results" v-slot="props">
          <TableColumn>
            <router-link class="menu-item" :to="{ name: 'tournament-player', params: { tournament: this.$route.params.tournament, playerId: props.row.id }}">{{ props.row.firstName }}</router-link>
          </TableColumn>
          <TableColumn>
            {{ props.row.lastName }}
          </TableColumn>
          <TableColumn>
            {{ props.row.club }}
          </TableColumn>
          <TableColumn>
            {{ props.row.pos }}
          </TableColumn>
        </Table>
      </TabItem>
    </Tabs>
  </template>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState, mapGetters } from 'vuex'
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'
import Table from '@/components/Table.vue'
import TableColumn from '@/components/TableColumn.vue'
import MatchCard from '@/components/MatchCard.vue'
import InfoText from '@/components/InfoText.vue'
import { mapId, resultsComparator } from '@/store/helpers.js'

export default {
  components: { Tabs, TabItem, MatchCard, Table, TableColumn, InfoText },
  data() {
    return {
      playerTableHeaders: [
        { 'field': 'firstName', 'label': 'First Name', 'sortable': true },
        { 'field': 'lastName', 'label': 'Last Name', 'sortable': true },
        { 'field': 'club', 'label': 'Club', 'sortable': true },
      ],
      resultsTableHeaders: [
        { 'field': 'firstName', 'label': 'First Name', 'sortable': false },
        { 'field': 'lastName', 'label': 'Last Name', 'sortable': false },
        { 'field': 'club', 'label': 'Club', 'sortable': false },
        { 'field': 'pos', 'label': 'Position', 'sortable': true, 'comparator': resultsComparator },
      ],
    }
  },
  mounted: function() {
    this.$store.dispatch('subscribeCategory', this.$route.params.categoryId);
  },
  watch: {
    '$route.params.categoryId': function() {
      this.$store.dispatch('subscribeCategory', this.$route.params.categoryId);
    }
  },
  computed: {
    ...mapState({
      categoryState: state => state.categoryState,
      category: state => state.category,
    }),
    ...mapGetters({
      matches: 'categoryMatches',
      players: 'categoryPlayers',
      results: 'categoryResults',
    }),
  },
  methods: {
    mapId: mapId,
  },
}
</script>

