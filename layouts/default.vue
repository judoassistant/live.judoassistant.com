<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" :to="{ name: 'index' }" exact-active-class="is-active">
          <img src="~assets/logo.svg" alt="JudoAssistant" height="28" />
        </nuxt-link>
        <nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active">
          Overview
        </nuxt-link>
        <nuxt-link :to="{ name: 'tournament-players', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active">
          Players
        </nuxt-link>
        <nuxt-link :to="{ name: 'tournament-categories', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active">
          Categories
        </nuxt-link>
        <nuxt-link :to="{ name: 'tournament-tatamis', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active">
          Tatamis
        </nuxt-link>

        <!-- <div class="navbar-burger"> -->
        <!--   <span /> -->
        <!--   <span /> -->
        <!--   <span /> -->
        <!-- </div> -->
      </div>
    </nav>

    <section class="main-content">
      <section class="section" v-if="showConnectionMessage">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="close-network" size="is-large">
            </b-icon>
          </p>
          <p>The connection has been lost. Try to refresh the page</p>
        </div>
      </section>
      <section class="section" v-if="showInvalidTournament">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large">
            </b-icon>
          </p>
          <p>Invalid tournament specified</p>
        </div>
      </section>
      <b-loading :active.sync="showLoadingIndicator"></b-loading>
      <nuxt v-if="showTournament"/>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    showLoadingIndicator() {
      return this.$store.state.connected;
    },
    showConnectionMessage() {
      return !this.$store.state.connecting && !this.$store.state.connected;
    },
    showInvalidTournament() {
      return this.$store.state.connected && this.$store.state.tournament == null && !this.$store.state.tournamentLoading;
    },
    showTournament() {
      return this.$store.state.connected && this.$store.state.tournament != null;
    }
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('selectTournament', this.$route.params.tournament);
  },
}
</script>
