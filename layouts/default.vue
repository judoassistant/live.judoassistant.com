<template>
  <div>
    <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/" exact-active-class="is-active">
          <img src="~assets/logo.svg" alt="JudoAssistant" height="28" />
        </nuxt-link>
        <nuxt-link to="/players" class="navbar-item" exact-active-class="is-active">
          Players
        </nuxt-link>
        <nuxt-link to="/categories" class="navbar-item" exact-active-class="is-active">
          Categories
        </nuxt-link>
        <nuxt-link to="/tatamis" class="navbar-item" exact-active-class="is-active">
          Tatamis
        </nuxt-link>

        <!-- <div class="navbar-burger"> -->
        <!--   <span /> -->
        <!--   <span /> -->
        <!--   <span /> -->
        <!-- </div> -->
      </div>
    </nav>

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Tournament',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Players',
          icon: 'account-multiple',
          to: { name: 'players' }
        },
        {
          title: 'Categories',
          icon: 'account-group',
          to: { name: 'categories' }
        },
        {
          title: 'Tatamis',
          icon: 'account-group',
          to: { name: 'tatamis' }
        }
      ]
    }
  }
}
</script>
