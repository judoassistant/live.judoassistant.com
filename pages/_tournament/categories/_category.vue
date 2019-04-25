<template>
  <section class="section">
    <div class="container">
      <b-loading :is-full-page=false :active.sync="loading"></b-loading>
      <div v-if="category != null">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'tournament-categories', params: {tournament: this.$route.params.tournament }}">Categories</nuxt-link></li>
            <li class="is-active"><a href="#" aria-current="page">{{ category.name }}</a></li>
          </ul>
        </nav>
        <h1 class="title">{{ tournament.name }}</h1>
        <h2 class="subtitle">{{ category.name }}</h2>
        <b-tabs>
          <b-tab-item label="Players" icon="account-multiple">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <b-table paginated :per-page=50 :data="players" default-sort="name" :mobile-cards="false">
              <template v-slot:default="props">
                <b-table-column sortable field="name" label="Name">
                  <nuxt-link :to="{ name: 'tournament-players-player', params: {player: props.row.id}}">{{ props.row.name}}</nuxt-link>
                </b-table-column>
                <b-table-column sortable field="rank" label="Rank">
                  {{ props.row.rank}}
                </b-table-column>
                <b-table-column sortable field="club" label="Club">
                  {{ props.row.club}}
                </b-table-column>
              </template>

              <template v-slot:empty>
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon icon="account-multiple" size="is-large">
                      </b-icon>
                    </p>
                    <p>There are no players in this category</p>
                  </div>
                </section>
              </template>
            </b-table>
          </b-tab-item>
          <b-tab-item label="Matches" icon="tournament">
            <MatchCard v-for="match in matches" v-if="!match.bye" :key="match.combinedId.matchId" :match="match"></MatchCard>
            <section class="section" v-if="matches.length == 0">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="tournament" size="is-large">
                  </b-icon>
                </p>
                <p>This category has no matches</p>
              </div>
            </section>
          </b-tab-item>
          <!-- <b-tab-item label="Results" icon="tournament"></b-tab-item> -->
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
  import MatchCard from '~/components/MatchCard'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'HomePage',
    mounted() {
      this.$store.dispatch('subscribeCategory', this.$route.params.category);
    },
    computed: {
      ...mapState({
        loading: state => state.subscribeCategoryLoading,
        category: state => state.subscribedCategory,
        tournament: state => state.tournament,
      }),
      ...mapGetters({
        players: 'subscribedCategoryPlayers',
        matches: 'subscribedCategoryMatches',
      }),
    },
    components: {
      MatchCard
    },
  }
</script>
