<template>
  <section class="section">
    <div class="container">
      <b-loading :is-full-page=false :active.sync="loading"></b-loading>
      <div v-if="hasPlayer">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'tournament-players', params: {tournament: this.$route.params.tournament }}">Players</nuxt-link></li>
            <li class="is-active"><a href="#" aria-current="page">{{ playerName }}</a></li>
          </ul>
        </nav>
        <h1 class="title">{{ tournament.name }}</h1>
        <h2 class="subtitle">{{ playerName }}</h2>

        <b-tabs>
          <b-tab-item label="Information" icon="account">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <table class="table is-striped is-fullwidth">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ playerName }}</td>
                </tr>
                <tr>
                  <td>Rank</td>
                  <td>{{ player.rank }}</td>
                </tr>
                <tr>
                  <td>Club</td>
                  <td>{{ player.club }}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{{ player.country }}</td>
                </tr>
              </tbody>

            </table>
          </b-tab-item>
          <b-tab-item label="Matches" icon="tournament">
            <MatchCard v-for="match in matches" :key="match.combinedId.matchId" :match="match"></MatchCard>
            <section class="section" v-if="matches.length == 0">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="tournament" size="is-large">
                  </b-icon>
                </p>
                <p>This player has no matches</p>
              </div>
            </section>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
  import MatchCard from '~/components/MatchCard'

  export default {
    name: 'Player',
    mounted() {
      this.$store.dispatch('subscribePlayer', this.$route.params.player);
      //this.$nextTick(() => {
      //  this.$nuxt.$loading.start();
      //});
    },
    computed: {
      loading() {
        return this.$store.state.subscribePlayerLoading;
      },
      hasPlayer() {
        return this.$store.state.subscribedPlayer != null;
      },
      player() {
        return this.$store.state.subscribedPlayer;
      },
      playerName() {
        const player = this.$store.state.subscribedPlayer;
        return player.firstName + ' ' + player.lastName;
      },
      tournament() {
        return this.$store.state.tournament;
      },
      matches() {
        var res = Array();
        for (const matchId of this.$store.state.subscribedPlayer.matches)
          res.push(this.$store.state.matches.get(matchId));
        return res;
      },
    },
    components: {
      MatchCard,
    },
  }
</script>
