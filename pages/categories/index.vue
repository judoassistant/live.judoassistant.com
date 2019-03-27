<template>
  <section class="section">
    <h1 class="title">Categories</h1>
    <b-table paginated :per-page=15 :data="categories" default-sort="name">
      <template v-slot:default="props">
        <b-table-column sortable field="name" label="Name">
          {{ props.row.name}}
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
  },
  data() {
    return {
      columns: [
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'state',
          label: 'State',
        },
        {
          field: 'playerCount',
          label: 'Number of Players',
        }
      ]
    }
  },
  components: {
    Card
  }
}
</script>
