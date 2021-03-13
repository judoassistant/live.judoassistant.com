<template>
  <ul class="pagination">
    <li class="pagination-previous"><a href="#">&lt;</a></li>
    <li class="pagination-number"><a href="#">1</a></li>
    <li class="pagination-dots">...</li>
    <li class="pagination-number"><a href="#">4</a></li>
    <li class="pagination-number"><a href="#">5</a></li>
    <li class="pagination-number"><a href="#">6</a></li>
    <li class="pagination-number"><a href="#">7</a></li>
    <li class="pagination-next"><a href="#">&gt;</a></li>
  </ul>
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

  $long-distance: .8em;
  $short-distance: .4em;

  .pagination {
    list-style-type: none;
    text-align: right;
    margin: 20px 0;
  }

  .pagination li {
    display: inline;
  }

  .pagination a, .pagination-dots {
    color: $color4;
  }

  .pagination a:hover {
    text-decoration: none;
    color: $color1;
  }

  .pagination-previous {
    margin-right: $long-distance;
  }

  .pagination-number {
    margin-left: $short-distance;
    margin-right: $short-distance;
  }

  .pagination-dots {
    margin-left: $long-distance;
    margin-right: $long-distance;
  }

  .pagination-next {
    margin-left: $long-distance;
  }

</style>

