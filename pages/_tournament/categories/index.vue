<template>
  <section class="section">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
        <li class="is-active"><a href="#" aria-current="page">Categories</a></li>
      </ul>
    </nav>
    <h1 class="title">{{ tournament.name }}</h1>
    <h2 class="subtitle">Categories</h2>
    <b-table paginated :per-page=15 :data="categories" default-sort="name">
      <template v-slot:default="props">
        <b-table-column sortable field="name" label="Name">
          <nuxt-link :to="{ name: 'tournament-categories-category', params: {category: props.row.id}}">{{ props.row.name}}</nuxt-link>
        </b-table-column>
        <b-table-column sortable field="state" label="State">
          {{ props.row.state}}
        </b-table-column>
        <b-table-column sortable field="playerCount" label="Number of Players">
          {{ props.row.playerCount}}
        </b-table-column>
      </template>

      <template v-slot:empty>
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="account-multiple" size="is-large">
              </b-icon>
            </p>
            <p>There are no categories in the tournament</p>
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
    categories() {
      return this.$store.state.categories
    },
    tournament() {
      return this.$store.state.tournament;
    },
  },
  components: {
    Card
  },
  methods: {
  }
}
</script>
