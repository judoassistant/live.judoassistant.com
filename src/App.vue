<template>
  <MainMenu />
  <InfoText v-if="connectionState == 'NOT_CONNECTED'" icon="cloud-off-outline">The connection to the served closed. Refresh the page to retry.</InfoText>
  <InfoText v-if="connectionState == 'CONNECTING'" icon="loading" rotating>Connecting to server..</InfoText>
  <router-view v-if="connectionState == 'CONNECTED'"/>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
import InfoText from '@/components/InfoText.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: { MainMenu, InfoText, },
  computed: {
    ...mapState({
      connectionState: state => state.connectionState
    }),
  },
  created: function() {
    this.$store.dispatch('connect')
  },
}
</script>

<style>

</style>
