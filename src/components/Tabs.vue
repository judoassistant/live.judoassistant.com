<template>
  <div class="tabs">
    <a v-for="(tab, tabIndex) in tabs" :key="tab.title" href="#" @click.prevent="selectTab(tabIndex)" :class="{ 'active' : tab.isActive }">
      {{ tab.title }}
    </a>
    <div class="filler"></div>
  </div>
  <slot></slot>
</template>

<script>
export default {
  name: 'Tabs',
  emits: ['change'],
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    }
  },
  methods: {
    selectTab(selectedIndex) {
      for (var i = 0; i < this.tabs.length; ++i)
          this.tabs[i].isActive = (i == selectedIndex);
      this.$emit('change', selectedIndex);
    },
  },
  mounted() {
    if (this.tabs.length == 0)
      return;

    for (const tab of this.tabs) {
      if (tab.isActive) {
        return;
      }
    }

    this.tabs[0].isActive = true;
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";

  /* Styling of tabs element */
  .tabs {
    display: flex;
    flex-direction: row;
    margin: 0 0 10px 0;
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

