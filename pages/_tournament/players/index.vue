<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
          <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
          <li class="is-active"><a href="#" aria-current="page">Players</a></li>
        </ul>
      </nav>

      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Players</h2>
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
              <p>There are no players in the tournament</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    players() {
      var res = []
      for (const player of this.$store.state.players.values()) {
        res.push({
          id: player.id,
          name: player.firstName + ' ' + player.lastName,
          club: player.club,
          rank: player.rank,
        });
      }

      return res;
    },
    tournament() {
      return this.$store.state.tournament;
    },
  },
  components: {
  },
  methods: {
    playerLink(id) {
      return '/players/' + id;
    },
  }
}
</script>
