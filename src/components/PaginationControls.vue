<template>
  <p>Controls go here</p>
</template>

<script>
export default {
  name: 'PaginationControls',
  props: {
    currentPage: Number,
    pageCount: Number,
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

</style>

