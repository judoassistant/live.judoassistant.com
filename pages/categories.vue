<template>
  <section class="section">
    <h1 class="title">Categories</h1>
    <b-table :data="data" :columns="columns"></b-table>
  </section>
</template>

<script>
  import Card from '~/components/Card'

export default {
  name: 'HomePage',
  data() {
    return {
      data: [
        { 'id': 1, 'name': 'Drenge A -45', 'state': 'finished', 'playerCount': 4},
        { 'id': 2, 'name': 'Drenge A -50', 'state': 'not_started', 'playerCount': 7},
        { 'id': 3, 'name': 'Drenge A -55', 'state': 'not_started', 'playerCount': 3},
        { 'id': 4, 'name': 'Drenge A -66', 'state': 'in_progress', 'playerCount': 5},
        { 'id': 5, 'name': 'Drenge A -81', 'state': 'in_progress', 'playerCount': 6},
        { 'id': 6, 'name': 'Piger A -48', 'state': 'finished', 'playerCount': 3},
        { 'id': 7, 'name': 'Piger A -52', 'state': 'not_started', 'playerCount': 5},
        { 'id': 8, 'name': 'Piger A -57', 'state': 'not_started', 'playerCount': 6},
        { 'id': 9, 'name': 'Piger B -48', 'state': 'in_progress', 'playerCount': 5},
        { 'id': 10, 'name': 'Piger C -35', 'state': 'in_progress', 'playerCount': 2},
      ],
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
