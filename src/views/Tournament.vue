<template>
  <main>
    <InfoText v-if="tournamentState == 'NOT_LOADED'" icon="cloud-off-outline">Tournament not found. The tournament does not exist.</InfoText>
    <InfoText v-if="tournamentState == 'LOADING'" icon="loading" rotating>Loading tournament..</InfoText>
    <template v-if="tournamentState == 'LOADED'">
      <h1>{{ tournament.name }}</h1>
      <router-view></router-view>
    </template>
  </main>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState, mapGetters } from 'vuex'
import InfoText from '@/components/InfoText.vue'

export default {
  components: { InfoText, },
  mounted: function() {
    this.$store.dispatch('subscribeTournament', this.$route.params.tournament);
  },
  watch: {
    '$route.params.tournament': function() {
      this.$store.dispatch('subscribeTournament', this.$route.params.tournament);
    }
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

