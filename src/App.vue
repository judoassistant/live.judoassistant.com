<template>
  <MainMenu />
  <router-view/>
</template>

<script>
// @ is an alias to /src
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'App',
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
