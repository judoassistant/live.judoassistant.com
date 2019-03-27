<template>
  <section class="section">
    <b-loading :is-full-page=false :active.sync="loading"></b-loading>
    <div v-if="!loading">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link to="/">JudoAssistant</nuxt-link></li>
          <li><nuxt-link to="/">Bjergkøbing Grandprix</nuxt-link></li>
          <li><nuxt-link to="/categories">Categories</nuxt-link></li>
          <li class="is-active"><a href="#" aria-current="page">Drenge A -45</a></li>
        </ul>
      </nav>
      <h1 class="title">Drenge A -45</h1>
      <b-tabs>
        <b-tab-item label="Players" icon="account-multiple">
          <!-- <b-table :data="data" :columns="columns"></b-table> -->
        </b-tab-item>
        <b-tab-item label="Matches" icon="tournament">
        </b-tab-item>
        <b-tab-item label="Results" icon="tournament"></b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
  import Card from '~/components/Card'

export default {
  name: 'HomePage',
  mounted() {
    this.$store.dispatch('selectCategory', this.$route.params.id);
    //this.$nextTick(() => {
    //  this.$nuxt.$loading.start();
    //});
  },
  computed: {
    loading() {
      return this.$store.state.detailedCategoryLoading;
    },
  },
  components: {
    Card
  },
}
</script>
