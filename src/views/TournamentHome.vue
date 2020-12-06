<template>
  <h2>Overview</h2>
  <table>
    <tr>
      <th>Tournament</th>
      <td>{{ tournament.name }}</td>
    </tr>
    <tr>
      <th>Date</th>
      <td>{{ tournament.date }}</td>
    </tr>
    <tr>
      <th>Location</th>
      <td>{{ tournament.location }}</td>
    </tr>
  </table>
  <h2>Upcoming Matches</h2>
  <Tabs>
    <TabItem title="Tatami 1" selected="true">
      <p>Hello from Tab 1</p>
    </TabItem>
    <TabItem title="Tatami 2">
      <p>Hello from Tab 2</p>
    </TabItem>
  </Tabs>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { Tabs, TabItem, },
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
}
</script>

