<template>
  <p class="grey-info-text">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'InfoText',
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  .grey-info-text {
      text-align: center;
      color: $color4;
      font-size: 1em;
  }

</style>
