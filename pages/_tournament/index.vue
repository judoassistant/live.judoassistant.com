<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
          <li class="is-active"><a href="#" aria-current="page">{{ tournament.name }}</a></li>
        </ul>
      </nav>
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
        <div class="column">
          Tatami 1
        </div>
        <div class="column">
          Tatami 2
        </div>
        <div class="column">
          Tatami 3
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
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
      }
    },
    components: {
    },
    methods: {
    }
  }
</script>

