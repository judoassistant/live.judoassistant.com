<template>
  <section class="section">
    <h1 class="title">Bjergkøbing Grand Prix</h1>
    <h2 class="subtitle">Players</h2>
    <b-table paginated :per-page=50 :data="players" default-sort="name">
      <template v-slot:default="props">
        <b-table-column sortable field="name" label="Name">
          <nuxt-link :to="{ name: 'tournament-players-player', params: {player: props.row.id}}">{{ props.row.name}}</nuxt-link>
        </b-table-column>
        <b-table-column sortable field="grade" label="Grade">
          {{ props.row.grade}}
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
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',
  computed: {
    players() {
      return this.$store.state.players.map((player) => {
        return { name: player.firstName + ' ' + player.lastName, club: player.club, grade: player.grade, club: player.club, id: player.id };
      });
    },
  },
  components: {
    Card
  },
  methods: {
    playerLink(id) {
      return '/players/' + id;
    }
  }
}
</script>
