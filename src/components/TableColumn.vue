<template>
  <td>
    <slot>cell content</slot>
  </td>
</template>

<script>
export default {
  name: 'TableColumn',
  props: {
    label: String,
    field: String,
  },
  created() {
    if (!(this.field in this.$parent.columns))
      this.$parent.columns[this.field] = this;
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

</style>

