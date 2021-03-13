<template>
  <h2>Overview</h2>
  <table>
    <tr>
      <th>Tournament</th>
      <td>{{ tournament.name }}</td>
    </tr>
    <tr>
      <th>Date</th>
      <td>{{ dateFilter(tournament.date) }}</td>
    </tr>
    <tr>
      <th>Location</th>
      <td>{{ tournament.location }}</td>
    </tr>
  </table>
  <h2>Upcoming Matches</h2>
  <Tabs>
    <TabItem v-for="(matches, index) in tatamiMatches" :key="index" :title="'Tatami ' + (index+1)">
      <InfoText v-if="matches.length == 0">This tatami has no matches yet.</InfoText>
      <MatchCard v-for="match in matches" :key="mapId(match.combinedId)" :match="match" ></MatchCard>
    </TabItem>
  </Tabs>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'
import MatchCard from '@/components/MatchCard.vue'
import InfoText from '@/components/InfoText.vue'
import { mapId } from '@/store/helpers.js'
import { dateFilter } from '@/store/filters.js'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { Tabs, TabItem, MatchCard, InfoText, },
  mounted: function() {
    /* this.$store.dispatch('subscribeTournament', this.$route.params.tournament); */
  },
  computed: {
    ...mapState({
      tournamentState: state => state.tournamentState,
      tournament: state => state.tournament,
    }),
    ...mapGetters({
      tatamiMatches: 'tatamiMatches',
    }),
  },
  methods: {
    mapId: mapId,
    dateFilter: dateFilter,
  }
}
</script>

