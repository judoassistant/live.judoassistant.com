<template>
  <h2>Tatamis</h2>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapState({
      tournament: state => state.tournament,
    }),
  },
}
</script>

