<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
          <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
          <li class="is-active"><a href="#" aria-current="page">Tatamis</a></li>
        </ul>
      </nav>
      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Tatamis</h2>
      <b-tabs @change=subscribeTab>
        <b-tab-item :label="'Tatami ' + tatamiIndex" v-for="tatamiIndex in tatamiCount" :key="tatamiIndex" class="tatami-tab">
          <b-loading :is-full-page=false :active=true v-if="!tatamiLoaded(tatamiIndex - 1, loading, tatami)"></b-loading>
          <div v-if="tatamiLoaded(tatamiIndex - 1, loading, tatami)">
            <div class="tile is-ancestor" v-for="concurrentGroup in tatami.blocks">
              <div class="tile is-parent is-vertical" v-for="sequentialGroup in concurrentGroup">
                <div class="tile is-child notification" v-for="block in sequentialGroup ">
                  <h3>Pulje 1 (Finished)</h3>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Tatamis',
  mounted() {
    this.$store.dispatch('subscribeTatami', 0);
  },
  computed: {
    ...mapState({
      loading: state => state.subscribeTatamiLoading,
      tatami: state => state.subscribedTatami,
      tournament: state => state.tournament,
      tatamiCount: state => state.tournament.tatamiCount,
    }),
  },
  methods: {
    subscribeTab: function(index) {
      this.$store.dispatch('subscribeTatami', index);
    },
    tatamiLoaded: function(index, loading, tatami) {
      return !loading && tatami != null && tatami.index == index;
    }
  }
}
</script>

<style>
  .tatami-tab {
    min-height: 100px;
  }
</style>
