<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" :to="{ name: 'index' }" exact-active-class="is-active">
          <img src="~assets/logo.svg" alt="JudoAssistant" height="28" />
        </nuxt-link>
        <a role="button" class="navbar-burger" :class="{'is-active': menuActive}" aria-label="menu" aria-expanded="false" @click="toggleMenu()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{'is-active': menuActive}">
        <div class="navbar-start">
          <nuxt-link v-if="showTournament" :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active" @click.native="toggleMenu()">
            Overview
          </nuxt-link>
          <nuxt-link v-if="showTournament" :to="{ name: 'tournament-players', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active" @click.native="toggleMenu()">
            Players
          </nuxt-link>
          <nuxt-link v-if="showTournament" :to="{ name: 'tournament-categories', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active" @click.native="toggleMenu()">
            Categories
          </nuxt-link>
          <nuxt-link v-if="showTournament" :to="{ name: 'tournament-tatamis', params: {tournament: this.$route.params.tournament }}" class="navbar-item" exact-active-class="is-active" @click.native="toggleMenu()">
            Tatamis
          </nuxt-link>
        </div>
      </div>
    </nav>

    <section class="main-content">
      <section class="section" v-if="showConnectionMessage">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="close-network" size="is-large">
            </b-icon>
          </p>
          <p>The connection to the server failed. Refresh the page to reconnect</p>
        </div>
      </section>
      <section class="section" v-if="showInvalidTournament">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large">
            </b-icon>
          </p>
          <p>The selected tournament does not exist</p>
        </div>
      </section>
      <b-loading :active.sync="showLoadingIndicator"></b-loading>
      <nuxt v-if="showTournament"/>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuActive: false,
    }
  },
  computed: {
    showLoadingIndicator() {
      return this.$store.state.connecting;
    },
    showConnectionMessage() {
      return !this.$store.state.connecting && !this.$store.state.connected;
    },
    showInvalidTournament() {
      return this.$store.state.connected && this.$store.state.tournament == null && !this.$store.state.tournamentLoading;
    },
    showTournament() {
      return this.$store.state.connected && this.$store.state.tournament != null;
    },
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
  },
  mounted() {
    this.$store.dispatch('subscribeTournament', this.$route.params.tournament);
  },
  head() {
    const tournament = this.$store.state.tournament;

    if (tournament == null) {
      return {
        title: "JudoAssistant"
      };
    }

    return {
      title: tournament.name
    }
  }
}
</script>
