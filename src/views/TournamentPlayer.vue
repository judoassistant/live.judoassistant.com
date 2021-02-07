<template>
  <template v-if="playerState == 'NOT_LOADED'">
    <p style='text-align: center;'>not loaded....</p>
  </template>
  <template v-if="playerState == 'LOADING'">
    <p style='text-align: center;'>loading....</p>
  </template>
  <template v-if="playerState == 'LOADED'">
    <h2>{{ player.firstName }} {{ player.lastName }}</h2>
    <Tabs>
      <TabItem title="Information" selected="true">
        <table>
          <tr>
            <th>Name</th>
            <td>{{ player.firstName }} {{ player.lastName }}</td>
          </tr>
          <tr>
            <th>Rank</th>
            <td>{{ player.rank }}</td>
          </tr>
          <tr>
            <th>Club</th>
            <td>{{ player.club }}</td>
          </tr>
          <tr>
            <th>Country</th>
            <td>{{ player.country }}</td>
          </tr>
          <tr>
            <th>Categories</th>
            <td>{{ player.country }}</td>
          </tr>
        </table>
      </TabItem>
      <TabItem title="Matches">
        <p>Hello from Tab 2</p>
      </TabItem>
    </Tabs>
  </template>
</template>

<script>
// TODO: translate enums to strings
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'
import { mapState } from 'vuex'

export default {
  components: { Tabs, TabItem, },
  mounted: function() {
    this.$store.dispatch('subscribePlayer', this.$route.params.playerId);
  },
  computed: {
    ...mapState({
      playerState: state => state.playerState,
      player: state => state.player,
    }),
  },
}
</script>

