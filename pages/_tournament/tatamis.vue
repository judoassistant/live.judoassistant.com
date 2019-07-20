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
      <b-tabs>
        <b-tab-item label="Tatami 1" icon="account">
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification">
                <h3>Pulje 1</h3>
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification">
                <h3>Pulje 2</h3>
              </div>
              <div class="tile is-child notification">
                <h3>Pulje 3</h3>
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification">
                <h3>Pulje 2</h3>
              </div>
              <div class="tile is-child notification">
                <h3>Pulje 3</h3>
              </div>
              <div class="tile is-child notification">
                <h3>Pulje 3</h3>
              </div>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification">
                <h3>Pulje 2</h3>
              </div>
              <div class="tile is-child notification">
                <h3>Pulje 3</h3>
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification">
                <h3>Pulje 2</h3>
              </div>
              <div class="tile is-child notification">
                <h3>Pulje 3</h3>
              </div>
              <div class="tile is-child notification">
                <h3>Pulje 3</h3>
              </div>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Tatami 2" icon="account">
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Tatamis',
  computed: mapState(['tournament']),
}
</script>
