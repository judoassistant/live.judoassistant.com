<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Overview</h2>
        <table class="table is-striped is-fullwidth">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ tournament.name }}</td>
            </tr>
            <tr>
              <td>Number of Players</td>
              <td>{{ playerCount }}</td>
            </tr>
            <tr>
              <td>Number of Categories</td>
              <td>{{ categoryCount }}</td>
            </tr>
            <tr>
              <td>Number of Clubs</td>
              <td>{{ clubCount }}</td>
            </tr>
          </tbody>
        </table>
      <h2 class="subtitle">Upcoming Matches</h2>
      <div class="columns">
        <div class="column" v-for="(matches, index) of tatamis">
          <h3>Tatami {{ index + 1 }}</h3>
          <MatchCard v-for="match in matches" v-if="!match.bye" :key="String(match.combinedId.categoryId) + '_' + String(match.combinedId.matchId)" :match="match" size="small"></MatchCard>
          <div class="has-text-grey has-text-centered" v-if="matches.length == 0">
            <p>This tatami has no upcoming matches</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import MatchCard from '~/components/MatchCard'

  export default {
    name: 'Tournament',
    computed: {
      ...mapState({
        tournament: state => state.tournament,
        playerCount: state => state.players.length,
        categoryCount: state => state.categories.length,
      }),
      clubCount() {
        const clubs = this.$store.state.players.map(player => player.club);
        const uniqueClubs = new Set(clubs);
        return uniqueClubs.size;
      },
      ...mapGetters({
        tatamis: 'tatamiMatches',
      }),
    },
    components: {
      MatchCard,
    },
    methods: {
    }
  }
</script>

