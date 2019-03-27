<template>
  <section class="section">
    <h1 class="title">Players {{counter}}</h1>
    <b-table paginated :per-page=15 :data="players" default-sort="last_name">
      <template v-slot:default="props">
        <b-table-column sortable field="first_name" label="First Name">
          {{ props.row.first_name}}
        </b-table-column>
        <b-table-column sortable field="last_name" label="Last Name">
          {{ props.row.last_name}}
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
  data() {
    return {
      columns: [
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
        },
        {
          field: 'grade',
          label: 'Grade',
        },
        {
          field: 'club',
          label: 'Club',
        },
      ]
    }
  },
  computed: {
    players() {
      return this.$store.state.players
    },
    counter() {
      return this.$store.state.counter
    }
  },
  components: {
    Card
  }
}
</script>
