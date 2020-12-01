<template>
  <nav>
    <div>
      <router-link id="logo" to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/UNESCO_white_logo.svg" alt="logo" /></router-link>
      <div class="filler"></div>
      <template v-if="tournamentState == 'LOADED'">
        <router-link class="menu-item" to="/fredericia/">Overview</router-link>
        <router-link class="menu-item" to="/fredericia/players">Players</router-link>
        <router-link class="menu-item" to="/fredericia/categories">Categories</router-link>
        <router-link class="menu-item" to="/fredericia/tatamis">Tatamis</router-link>
      </template>
      <a class="menu-item" id="curtain-button" href="#"><span class="mdi mdi-menu"></span></a>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainMenu',
  computed: {
    ...mapState({
      tournamentState: state => state.tournamentState,
    }),
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  nav {
    background: $color5;
  }

  nav > div {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: row;
  }

  nav a#logo {
    height: 60px;
    transition: 0.2s;
  }

  nav a#logo img {
    height: 40px;
    margin: 10px 16px;
  }

  nav .filler {
    flex-grow: 1;
  }

  nav .menu-item {
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

  nav a.menu-item:hover, nav a#logo:hover, nav .router-link-active {
    text-decoration: none;
    background: darken($color5, 6);
  }

  nav #curtain-button {
    font-size: 1.2em;
    display: none;
  }

  /* Styling of curtain menu */
  #curtain-nav {
    background: white;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 300px;
    box-shadow: 0 0 10px 0 #6c7b99;
    /* box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px; */
    border-right: 1px solid #d8dee9;
    display: none;
  }

  #curtain-nav a {
    display: block;
    color: $color1;
    text-transform: uppercase;
    font-size: .80em;
    font-weight: 400;
    text-align: center;
    padding: 16px 0;
    transition: 0.2s;
  }

  #curtain-nav a.active, #curtain-nav a:hover {
    text-decoration: none;
    background: #eceff4;
    color: $color5;
  }
</style>
