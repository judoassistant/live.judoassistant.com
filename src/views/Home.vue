<template>
  <main>
    <h1>Tournament Overview</h1>
    <h2>Upcoming Tournaments</h2>
    <Table/>
    <h2>Previous Tournaments</h2>
    <Table/>
  </main>
</template>

<script>
import Table from '@/components/Table.vue'

export default {
  components: {
    Table
  },
}
</script>
