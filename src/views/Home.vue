<template>
  <main>
    <h1>Tournament Overview</h1>
    <h2>Upcoming Tournaments</h2>
    <Table :data="data" :fields="fields" v-slot="props">
      <td><a href="#">{{ props.row.name }}</a></td>
      <td>{{ props.row.loc }}</td>
      <td>{{ props.row.dat }}</td>
    </Table>
    <h2>Previous Tournaments</h2>
  </main>
</template>

<script>
import Table from '@/components/Table.vue'

export default {
  components: { Table },
  data: function() {
    return {
      data: [
        {
          id: 1,
          name: "Ungdomsturnering Fredericia",
          loc: "Fredericia",
          dat: "Saturday, October 24, 2020",
        },
        {
          id: 2,
          name: "Ungdomsturnering Korsør",
          loc: "Korsør",
          dat: "Saturday, October 24, 2020",
        },
        {
          id: 3,
          name: "Ungdomsturnering Skive",
          loc: "Skive",
          dat: "Saturday, October 17, 2020",
        },
      ],
      fields: [
        { field: 'name', label: 'Name'},
        { field: 'loc', label: 'Location'},
        { field: 'dat', label: 'Date'},
      ]
    }
  },
}
</script>
