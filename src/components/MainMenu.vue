<template>
  <nav id="nav-bar">
    <div>
      <router-link id="logo" :to="{ name: 'home' }"><img src="@/assets/logo.svg" alt="logo" /></router-link>
      <div class="filler"></div>
      <template v-if="this.$route.params.tournament != null">
        <router-link class="menu-item" :to="{ name: 'tournament-home', params: { tournament: this.$route.params.tournament }}">Overview</router-link>
        <router-link class="menu-item" :to="{ name: 'tournament-players', params: { tournament: this.$route.params.tournament }}">Players</router-link>
        <router-link class="menu-item" :to="{ name: 'tournament-categories', params: { tournament: this.$route.params.tournament }}">Categories</router-link>
        <router-link class="menu-item" :to="{ name: 'tournament-tatamis', params: { tournament: this.$route.params.tournament }}">Tatamis</router-link>

        <a class="menu-item" id="curtain-button" href="#" @click.prevent="showNavCurtain = true"><span class="mdi mdi-menu"></span></a>
      </template>
    </div>
  </nav>
  <div id="nav-fade" v-if="showNavCurtain" @click="showNavCurtain = false"></div>
  <nav id="nav-curtain" v-if="showNavCurtain">
      <template v-if="this.$route.params.tournament != null">
        <router-link class="menu-item" :to="{ name: 'tournament-home', params: { tournament: this.$route.params.tournament }}" @click="showNavCurtain = false">Overview</router-link>
        <router-link class="menu-item" :to="{ name: 'tournament-players', params: { tournament: this.$route.params.tournament }}" @click="showNavCurtain = false">Players</router-link>
        <router-link class="menu-item" :to="{ name: 'tournament-categories', params: { tournament: this.$route.params.tournament }}" @click="showNavCurtain = false">Categories</router-link>
        <router-link class="menu-item" :to="{ name: 'tournament-tatamis', params: { tournament: this.$route.params.tournament }}" @click="showNavCurtain = false"> Tatamis</router-link>
      </template>
  </nav>
</template>

<script>
/* import { mapState } from 'vuex' */

export default {
  name: 'MainMenu',
  data() {
    return {
      showNavCurtain: false,
    };
  },
  methods: {
    toggleNavCurtain: function() {
      this.showNavCurtain = !this.showNavCurtain;
    }
  }
  /* computed: { */
  /*   ...mapState({ */
  /*     tournamentState: state => state.tournamentState, */
  /*   }), */

  /* }, */
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";

  /* styling of nav-bar */
  #nav-bar {
    background: $color5;
  }

  #nav-bar > div {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  #nav-bar a#logo {
    height: 60px;
    transition: 0.2s;
  }

  #nav-bar a#logo img {
    height: 40px;
    margin: 10px 16px;
  }

  #nav-bar .filler {
    flex-grow: 1;
  }

  #nav-bar .menu-item {
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 16px;
    color: white;
    text-transform: uppercase;
    font-size: .80em;
    font-weight: 400;
    transition: 0.2s;
  }

  #nav-bar a.menu-item:hover, #nav-bar a#logo:hover, #nav-bar .router-link-exact-active {
    text-decoration: none;
    background: darken($color5, 6);
  }

  #nav-bar #curtain-button {
    font-size: 1.2em;
    display: none;
  }

  /* Styling of curtain nav */
  #nav-curtain {
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 300px;
    box-shadow: 0 0 10px 0 #6c7b99;
    /* box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px; */
    border-right: 1px solid #d8dee9;
  }

  #nav-fade {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    transition: 0.2;
  }

  #nav-curtain .menu-item {
    display: block;
    color: $color1;
    text-transform: uppercase;
    font-size: .80em;
    font-weight: 400;
    text-align: center;
    padding: 16px 0;
    transition: 0.2s;
  }

  #nav-curtain .router-link-exact-active, #nav-curtain a.menu-item:hover {
    text-decoration: none;
    background: #eceff4;
    color: $color5;
  }

  /* Media queries (tablets and down) */
  @media (max-width: 768px) {
    #nav-bar .menu-item {
      display: none;
    }

    #nav-bar #curtain-button {
      display: block;
    }
  }
</style>

