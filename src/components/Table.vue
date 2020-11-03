<template>
  <table>
    <tr>
      <!-- <th class="active">Date <span class="mdi mdi-arrow-down"></span></th> -->
      <th v-for="field in fields" :key="field.field">{{field.label}}</th>
    </tr>
    <tr v-for="row in data" :key="row.id">
      <slot v-bind:row="row"></slot>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: Array,
    fields: Array,
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  table th.active {
    border-bottom: 1px solid $color3;
    color: $color1;
  }
</style>

