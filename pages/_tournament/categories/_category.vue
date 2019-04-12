<template>
  <section class="section">
    <b-loading :is-full-page=false :active.sync="loading"></b-loading>
    <div v-if="hasCategory">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
          <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
          <li><nuxt-link :to="{ name: 'tournament-categories', params: {tournament: this.$route.params.tournament }}">Categories</nuxt-link></li>
          <li class="is-active"><a href="#" aria-current="page">{{ category.name }}</a></li>
        </ul>
      </nav>
      <h1 class="title">{{ category.name }}</h1>
      <b-tabs>
        <b-tab-item label="Players" icon="account-multiple">
          <!-- <b-table :data="data" :columns="columns"></b-table> -->
          <b-table paginated :per-page=50 :data="players" default-sort="name">
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
          <!-- <b-table :data="data" :columns="columns"></b-table> -->
          <b-table paginated :per-page=50 :data="matches" default-sort="title">
            <template v-slot:default="props">
              <b-table-column sortable field="title" label="Title">
                <!-- <nuxt-link :to="{ name: 'tournament-players-player', params: {player: props.row.id}}">{{ props.row.name}}</nuxt-link> -->
                {{ props.row.title }}
              </b-table-column>
            </template>

            <template v-slot:empty>
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="tournament" size="is-large">
                    </b-icon>
                  </p>
                  <p>There are no matches in this category</p>
                </div>
              </section>
            </template>
          </b-table>
        </b-tab-item>
        <b-tab-item label="Results" icon="tournament"></b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
  import Card from '~/components/Card'

export default {
  name: 'HomePage',
  mounted() {
    this.$store.dispatch('subscribeCategory', this.$route.params.category);
    //this.$nextTick(() => {
    //  this.$nuxt.$loading.start();
    //});
  },
  computed: {
    loading() {
      return this.$store.state.subscribeCategoryLoading;
    },
    hasCategory() {
      return this.$store.state.subscribedCategory != null;
    },
    category() {
      return this.$store.state.subscribedCategory;
    },
    players() {
      const category = this.$store.state.subscribedCategory;
      return category.players.map((id) => {
        const player = this.$store.state.players.get(id);

        return {
          id: player.id,
          name: player.firstName + ' ' + player.lastName,
          club: player.club,
          rank: player.rank,
        };
      });
    },
    matches() {
      const category = this.$store.state.subscribedCategory;
      return category.matches.map((combinedId) => {
        const match = this.$store.state.matches.get(combinedId.matchId);

        return match;
      });
    },
    tournament() {
      return this.$store.state.tournament;
    }
  },
  components: {
    Card
  },
}
</script>
