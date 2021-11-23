<template>
  <InfoText v-if="playerState == 'NOT_LOADED'" icon="cloud-off-outline">Player not found. The player does not exist.</InfoText>
  <InfoText v-if="playerState == 'LOADING'" icon="loading" rotating>Loading player..</InfoText>
  <template v-if="playerState == 'LOADED'">
    <h2>{{ player.firstName }} {{ player.lastName }}</h2>
    <Tabs>
      <TabItem title="Information" selected="true">
        <table>
          <tr>
            <th>Name</th>
            <td>{{ player.firstName }} {{ player.lastName }}</td>
          </tr>
          <tr>
            <th>Rank</th>
            <td>{{ rankFilter(player.rank) }}</td>
          </tr>
          <tr>
            <th>Club</th>
            <td>{{ player.club }}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{{ countryFilter(player.country) }}</td>
          </tr>
          <tr>
            <th>Categories</th>
            <td>
              <template v-for="(category, index) in categories" :key="category.id">
                <router-link class="menu-item" :to="{ name: 'tournament-category', params: { tournament: this.$route.params.tournament, categoryId: category.id }}">{{ category.name }}</router-link>
                <template v-if="index < categories.length - 1">, </template>
              </template>
            </td>
          </tr>
        </table>
      </TabItem>
      <TabItem title="Matches">
        <InfoText v-if="matches.length == 0">This player has no matches yet.</InfoText>
        <MatchCard v-for="match in matches" :key="mapId(match.combinedId)" :match="match" ></MatchCard>
      </TabItem>
    </Tabs>
  </template>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'
import MatchCard from '@/components/MatchCard.vue'
import InfoText from '@/components/InfoText.vue'
import { mapState, mapGetters } from 'vuex'
import { sexFilter, rankFilter, countryFilter } from '@/store/filters.js'
import { mapId } from '@/store/helpers.js'

export default {
  components: { Tabs, TabItem, MatchCard, InfoText },
  mounted: function() {
    this.$store.dispatch('subscribePlayer', this.$route.params.playerId);
  },
  watch: {
    '$route.params.playerId': function() {
      this.$store.dispatch('subscribePlayer', this.$route.params.playerId);
    }
  },
  methods: {
    sexFilter: sexFilter,
    rankFilter: rankFilter,
    countryFilter: countryFilter,
    mapId: mapId
  },
  computed: {
    ...mapState({
      playerState: state => state.playerState,
      player: state => state.player,
    }),
    ...mapGetters({
      matches: 'playerMatches',
      categories: 'playerCategories',
    }),
  },
}
</script>

