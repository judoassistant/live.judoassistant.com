<template>
  <MainMenu />
  <template v-if="connectionState == 'NOT_CONNECTED'">
    <p style='text-align: center;'>not connected....</p>
  </template>
  <template v-if="connectionState == 'CONNECTING'">
    <p style='text-align: center;'>not connected....</p>
  </template>
  <router-view v-if="connectionState == 'CONNECTED'"/>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      connectionState: state => state.connectionState
    }),
  },
  created: function() {
    this.$store.dispatch('connect')
  },
  components: {
    MainMenu
  },
}
</script>

<style>

</style>
