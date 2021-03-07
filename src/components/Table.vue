<template>
  <table>
    <tr>
      <!-- <th class="active">Date <span class="mdi mdi-arrow-down"></span></th> -->
      <th v-for="header in headers" :key="header.field" :class="{ 'active' : header.field == sortField, 'sortable' : header.sortable }" @click="sortBy(header)">
        {{ header.label }} <span v-if="header.field == sortField" :class="{ 'mdi' : true, 'mdi-arrow-down': sortAsc, 'mdi-arrow-up': !sortAsc }"></span>
      </th>
    </tr>
    <tr v-for="row in sortedRows" :key="row.id">
      <slot v-bind:row="row"></slot>
    </tr>
  </table>
</template>

<script>
function defaultCompare(a, b, isAsc) {
  if (isAsc)
    return a > b;
  return a < b;
}

export default {
  name: 'Table',
  props: {
    headers: Object,
    rows: Object,
  },
  data() {
    return {
      sortField: null,
      sortAsc: null,
    }
  },
  computed: {
    sortedRows: function() {
      var field = this.sortField;
      var sortAsc = this.sortAsc;

      var res = [...this.rows];
      var comparator = defaultCompare;

      for (const header of this.headers) {
        if (header.field != field)
          continue;
        if (!('comparator' in header))
          continue;
        comparator = header['comparator'];
      }

      res.sort(function(a, b) { return comparator(a[field], b[field], sortAsc); });
      return res;
    },
  },
  methods: {
    sortBy: function(header) {
      if (!header.sortable)
        return;
      if (this.sortField == header.field) {
        this.sortAsc = !this.sortAsc;
      }
      else {
        this.sortField = header.field;
        this.sortAsc = true;
      }
    },
  },
  created() {
    this.sortField = this.headers[0].field;
    this.sortAsc = true;
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  table th.sortable:hover {
    cursor: pointer;
    text-decoration: none;
  }

  table th.active {
    border-bottom: 1px solid $color3;
    color: $color1;
  }
</style>

