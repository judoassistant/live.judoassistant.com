<template>
  <template v-if="categoryState == 'NOT_LOADED'">
    <p style='text-align: center;'>not loaded....</p>
  </template>
  <template v-if="categoryState == 'LOADING'">
    <p style='text-align: center;'>loading....</p>
  </template>
  <template v-if="categoryState == 'LOADED'">
    <h2>{{ category.name }}</h2>
    <Tabs>
      <TabItem title="Players" selected="true">
      </TabItem>
      <TabItem title="Matches">
        <p>Hello from Matches tab</p>
      </TabItem>
      <TabItem title="Results">
        <p>Hello from Results tab</p>
      </TabItem>
    </Tabs>
  </template>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState } from 'vuex'
import Tabs from '@/components/Tabs.vue'
import TabItem from '@/components/TabItem.vue'

export default {
  components: { Tabs, TabItem, },
  mounted: function() {
    this.$store.dispatch('subscribeCategory', this.$route.params.categoryId);
  },
  computed: {
    ...mapState({
      categoryState: state => state.categoryState,
      category: state => state.category,
    }),
  },
}
</script>

