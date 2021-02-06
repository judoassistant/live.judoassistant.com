<template>
  <table>
    <tr>
      <!-- <th class="active">Date <span class="mdi mdi-arrow-down"></span></th> -->
      <th v-for="header in headers" :key="header.field" :class="{ 'active' : header.field == sortField, 'sortable' : header.sortable }" @click="sortBy(header)">
        {{ header.label }} <span v-if="header.field == sortField" :class="{ 'mdi' : true, 'mdi-arrow-down': sortDir == 1, 'mdi-arrow-up': sortDir == -1 }"></span>
      </th>
    </tr>
    <tr v-for="row in sortedRows" :key="row.id">
      <slot v-bind:row="row"></slot>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    headers: Object,
    rows: Object,
  },
  data() {
    return {
      sortField: null,
      sortDir: null,
    }
  },
  computed: {
    sortedRows: function() {
      var field = this.sortField;
      var sortDir = this.sortDir;

      var res = [...this.rows];
      res.sort(function(a, b) { if (sortDir == 1) return a[field] > b[field]; else return a[field] < b[field]; });
      return res;
    },
  },
  methods: {
    sortBy: function(header) {
      if (!header.sortable)
        return;
      if (this.sortField == header.field) {
        this.sortDir = -this.sortDir;
      }
      else {
        this.sortField = header.field;
        this.sortDir = 1;
      }
    },
  },
  created() {
    this.sortField = this.headers[0].field;
    this.sortDir = 1;
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

