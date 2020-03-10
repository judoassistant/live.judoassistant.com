<template>
  <section class="section">
    <div class="container">
      <b-loading :is-full-page=false :active.sync="loading"></b-loading>
      <div v-if="tournaments != null">
        <h1 class="title">Current Tournaments</h1>
        <b-table paginated :per-page=50 :data="tournaments" default-sort="name" :mobile-cards="false">
          <template v-slot:default="props">
            <b-table-column sortable field="name" label="Tournament">
              <nuxt-link :to="{ name: 'tournament', params: {tournament: props.row.webName}}">{{ props.row.name }}</nuxt-link>
            </b-table-column>
            <b-table-column sortable field="location" label="Location">
              {{ props.row.location}}
            </b-table-column>
            <b-table-column sortable field="date" label="Date">
              {{ props.row.date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }}
            </b-table-column>
          </template>

          <template v-slot:empty>
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <b-icon icon="account-multiple" size="is-large">
                  </b-icon>
                </p>
                <p>There are no upcoming tournaments</p>
              </div>
            </section>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'HomePage',
    layout: 'frontpage',
    mounted() {
      this.$store.dispatch('listTournaments');
    },
    computed: {
        ...mapState({
          loading: state => state.tournamentsLoading,
          tournaments: state => state.tournaments,
        }),
    },
    components: {
    },
    methods: {
    }
  }
</script>
