<template>
  <h2>Category</h2>
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
  data: function() {
  },
}
</script>

