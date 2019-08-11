<template>
  <section class="section">
    <div class="container">
      <b-loading :is-full-page=false :active.sync="loading"></b-loading>
      <div v-if="player != null">
        <h1 class="title">{{ tournament.name }}</h1>
        <h2 class="subtitle">{{ player.name }}</h2>

        <b-tabs>
          <b-tab-item label="Information" icon="account">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <table class="table is-striped is-fullwidth">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ player.name }}</td>
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
                <tr>
                  <td>Categories</td>
                  <td>
                    <b-taglist class="category-list">
                      <b-tag type="is-primary" v-for="category in categories" :key="category.id">
                        <nuxt-link :to="{ name: 'tournament-categories-category', params: {category: category.id}}">{{ category.name }}</nuxt-link>
                      </b-tag>
                    </b-taglist>
                  </td>
                </tr>
              </tbody>

            </table>
          </b-tab-item>
          <b-tab-item label="Matches" icon="tournament">
            <MatchCard v-for="match in matches" :key="String(match.combinedId.categoryId) + '_' + String(match.combinedId.matchId)" :match="match"></MatchCard>
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

<style>
  .category-list a {
    color: white;
  }
</style>

<script>
  import MatchCard from '~/components/MatchCard'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'Player',
    mounted() {
      this.$store.dispatch('subscribePlayer', this.$route.params.player);
    },
    computed: {
      ...mapState({
        loading: state => state.subscribePlayerLoading,
        player: state => state.subscribedPlayer,
        tournament: state => state.tournament,
      }),
      ...mapGetters({
        categories: 'subscribedPlayerCategories',
        matches: 'subscribedPlayerMatches',
      }),
    },
    components: {
      MatchCard,
    },
  }
</script>
