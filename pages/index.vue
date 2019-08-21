<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Current Tournaments</h1>
      <table class="table is-striped is-fullwidth">
        <thead>
          <th>Tournament</th>
          <th>Location</th>
          <th>Date</th>
        </thead>
        <tbody>
          <tr>
            <td><nuxt-link :to="{ name: 'tournament', params: {tournament: 'bjergkobing' }}">Bjergkøbing Grand Prix</nuxt-link></td>
            <td>Bjergkøbing</td>
            <td>24th of August</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'frontpage',
  computed: {
  },
  components: {
  },
  methods: {
  }
}
</script>
