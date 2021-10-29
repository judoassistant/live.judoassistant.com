<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    title: String,
    selected: { default: false },
  },
  data() {
    return {
      isActive: false,
    }
  },
  created() {
    this.$parent.tabs.push(this);
  },
  mounted() {
    this.isActive = this.selected;
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";
</style>

