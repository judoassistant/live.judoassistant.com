<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Categories</h2>
      <b-table paginated :per-page=15 :data="categories" default-sort="name" :mobile-cards="false">
        <template v-slot:default="props">
          <b-table-column sortable field="name" label="Name" :custom-sort="numeric_sort">
            <nuxt-link :to="{ name: 'tournament-categories-category', params: {category: props.row.id}}">{{ props.row.name}}</nuxt-link>
          </b-table-column>
        </template>

        <template v-slot:empty>
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="account-multiple" size="is-large">
                </b-icon>
              </p>
              <p>There are no categories in the tournament</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Categories',
  computed: mapState(['categories', 'tournament']),
  methods: {
    numeric_sort(a, b, isAsc) {
      // Split the string and compare each part
      // Compare numbers as numbers
      if (a == b)
        return 0;

      const aName = a.name.split(" ");
      const bName = b.name.split(" ");

      for (var i = 0; i < aName.length && i < bName.length; i++) {
        const aPart = aName[i]
        const bPart = bName[i]

        if (aPart == bPart)
          continue;

        const aNumber = Number(aPart);
        const bNumber = Number(bPart);

        // Compare parts as numbers
        if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
          if (aNumber == bNumber)
            continue;
          return (aNumber < bNumber && isAsc ? -1 : 1);
        }

        // Compare parts as strings
        if (Number.isNaN(aNumber) && Number.isNaN(bNumber)) {
          if (aPart == bPart)
            continue;
          return (aPart < bPart && isAsc ? -1 : 1);
        }

        // Numbers should appear first in the ordering
        if (!Number.isNaN(aNumber))
          return (isAsc ? -1 : 1);

        // if (!Number.isNaN(bNumber))
        return (isAsc ? 1 : -1);
      }

      // Both compare equal so far. The shortest should appear first
      return (aName.length < bName.length && isAsc ? -1 : 1);
    }
  }
}
</script>
