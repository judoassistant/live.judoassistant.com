<template>
  <main>
    <h1>Ungdomsturnering Fredericia</h1>
    <h2>Overview</h2>
    <table>
      <tr>
        <th>Name</th>
        <td>Bjergkøbing Grandprix</td>
      </tr>
      <tr>
        <th>Date</th>
        <td>Saturday, October 24, 2020</td>
      </tr>
      <tr>
        <th>Location</th>
        <td>Fredericia</td>
      </tr>
    </table>
    <h2>Upcoming Matches</h2>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: { },
  mounted: function() {
    this.$store.dispatch('fetchTournaments')
  },
  computed: {
    ...mapState({
      loading: state => state.tournamentState,
      tournament: state => state.tournament,
    }),
  },
}
</script>

