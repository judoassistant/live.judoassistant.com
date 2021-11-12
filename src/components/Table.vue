<template>
  <table>
    <tr>
      <!-- <th class="active">Date <span class="mdi mdi-arrow-down"></span></th> -->
      <th v-for="header in headers" :key="header.field" :class="{ 'active' : header.field == sortField, 'sortable' : header.sortable }" @click="sortBy(header)">
        {{ header.label }}
        <span v-if="header.field == sortField" :class="{ 'mdi' : true, 'mdi-arrow-down': sortAsc, 'mdi-arrow-up': !sortAsc }"></span>
        <span v-if="header.field != sortField" :class="{ 'mdi' : true, 'mdi-arrow-down': sortAsc, 'mdi-arrow-up': !sortAsc, 'hidden-icon': true }"></span>
      </th>
    </tr>
    <tr v-for="row in sortedRows" :key="row.id">
      <slot v-bind:row="row"></slot>
    </tr>
  </table>

  <PaginationControls v-model:page="page" :pageCount="pageCount" />
</template>

<script>
import PaginationControls from '@/components/PaginationControls.vue'

function defaultCompare(a, b, isAsc) {
  const areBothStrings = (typeof a == "string") && (typeof b == "string");
  if (areBothStrings) {
    return a.localeCompare(b, "da") * (isAsc ? 1 : -1);
  }

  if (isAsc)
    return a > b;
  return a < b;
}

export default {
  name: 'Table',
  components: { PaginationControls },
  props: {
    headers: Array,
    rows: Array,
    pageSize: {
      type: Number,
      default: 50,
    }
  },
  data() {
    return {
      sortField: null,
      sortAsc: null,
      page: 0,
    }
  },
  computed: {
    pageCount: function() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
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
      res = res.slice(this.page*this.pageSize, (this.page+1)*this.pageSize);

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
    if (this.headers.length == 0)
      return;

    this.sortField = null;
    this.sortAsc = null;
    for (const header of this.headers) {
      if ('sortable' in header && header.sortable && this.sortField == null) {
        this.sortField = header.field
        this.sortAsc = 'ASC';
      }

      if ('defaultSort' in header) {
        this.sortField = header.field;
        this.sortAsc = (header.defaultSort != 'DESC');
        return;
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";

  table th {
    white-space: nowrap;
    user-select: none;
  }

  table th.sortable:hover {
    cursor: pointer;
    text-decoration: none;
  }

  table th.active {
    border-bottom: 1px solid $color3;
    color: $color1;
  }

  .hidden-icon {
    color: white;
  }
</style>

