<template>
  <main>
    <template v-if="tournamentState == 'NOT_LOADED'">
      <p style='text-align: center;'>not loaded....</p>
    </template>
    <template v-if="tournamentState == 'LOADING'">
      <p style='text-align: center;'>loading....</p>
    </template>
    <template v-if="tournamentState == 'LOADED'">
      <h1>{{ tournament.name }}</h1>
      <router-view></router-view>
    </template>
  </main>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState, mapGetters } from 'vuex'

export default {
  components: {},
  mounted: function() {
    this.$store.dispatch('subscribeTournament', this.$route.params.tournament);
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

