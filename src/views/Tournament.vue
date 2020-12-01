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
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: { },
  mounted: function() {
    this.$store.dispatch('subscribeTournament', this.$route.params.tournament);
  },
  computed: {
    ...mapState({
      tournamentState: state => state.tournamentState,
      tournament: state => state.tournament,
    }),
  },
}
</script>

