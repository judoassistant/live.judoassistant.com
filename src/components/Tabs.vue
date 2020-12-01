<template>
  <div class="tabs">
    <a v-for="tab in tabs" :key="tab.title" href="#" @click.prevent="selectTab(tab)" :class="{ 'active' : tab.isActive }">
      {{ tab.title }}
    </a>
    <div class="filler"></div>
  </div>
  <slot></slot>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    }
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.title == selectedTab.title);
      });
    },
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  /* Styling of tabs element */
  .tabs {
    display: flex;
    flex-direction: row;
  }

  .tabs a {
    margin: 0;
    display: block;
    padding: 8px 16px;
    border-bottom: 1px solid $color2;
    color: $color1;
    transition: 0.2s;
  }

  .tabs a:hover, .tabs a.active {
    text-decoration: none;
    color: $color5;
    border-bottom: 1px solid $color5;
  }

  .tabs .filler {
    flex-grow: 1;
    border-bottom: 1px solid $color2;
  }
</style>

