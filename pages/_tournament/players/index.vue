<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Players</h2>
      <b-table paginated :per-page=50 :data="players" default-sort="name" :mobile-cards="false">
        <template v-slot:default="props">
          <b-table-column sortable field="name" label="Name">
            <nuxt-link :to="{ name: 'tournament-players-player', params: {player: props.row.id}}">{{ props.row.name }}</nuxt-link>
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
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  computed: mapState(['tournament', 'players']),
}
</script>
