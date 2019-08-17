<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/" exact-active-class="is-active">
          <img src="~assets/logo.svg" alt="JudoAssistant" height="28" />
        </nuxt-link>

        <!-- <div class="navbar-burger"> -->
        <!--   <span /> -->
        <!--   <span /> -->
        <!--   <span /> -->
        <!-- </div> -->
      </div>
    </nav>

    <section class="main-content">
      <section class="section" v-if="!connected">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="close-network" size="is-large">
            </b-icon>
          </p>
          <p>The connection to the server failed. Refresh the page to reconnect</p>
        </div>
      </section>
      <b-loading :is-full-page=true :active.sync="loading"></b-loading>
      <nuxt v-if="!loading && connected"/>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    connected() {
      return this.$store.state.connected;
    }
  },
  head() {
    return {
      title: "JudoAssistant"
    }
  }
}
</script>
