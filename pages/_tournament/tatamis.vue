<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Tatamis</h2>
      <b-tabs @change=subscribeTab>
        <b-tab-item :label="'Tatami ' + tatamiIndex" v-for="tatamiIndex in tatamiCount" :key="tatamiIndex" class="tatami-tab">
          <b-loading :is-full-page=false :active=true v-if="!tatamiLoaded(tatamiIndex - 1, loading, tatami)"></b-loading>
          <div v-if="tatamiLoaded(tatamiIndex - 1, loading, tatami)">
            <div class="has-text-grey has-text-centered" v-if="tatami.blocks.length == 0">
              <p>This tatami has no matches</p>
            </div>
            <div class="concurrent-group" v-for="concurrentGroup in tatami.blocks">
              <div class="sequential-group" v-for="sequentialGroup in concurrentGroup">
                <div class="tatami-block" :class="{finished: block.status == 'FINISHED', started: block.status == 'STARTED', 'not-started': block.status == 'NOT_STARTED'}" v-for="block in sequentialGroup ">
                  <div class="inner">
                      <nuxt-link :to="{ name: 'tournament-categories-category', params: {category: block.id}}">{{ block.name }}</nuxt-link>
                      <p>({{block.type}})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Tatamis',
  mounted() {
    this.$store.dispatch('subscribeTatami', 0);
  },
  computed: {
    ...mapState({
      loading: state => state.subscribeTatamiLoading,
      tournament: state => state.tournament,
      tatamiCount: state => state.tournament.tatamiCount,
    }),
    tatami: function() {
      const subscribedTatami = this.$store.state.subscribedTatami;
      if (subscribedTatami == null)
        return null;

      var blocksInfo = [];
      for (const concurrentGroup of subscribedTatami.blocks) {
        var concurrentGroupInfo = [];
        for (const sequentialGroup of concurrentGroup) {
          var sequentialGroupInfo = [];
          for (const block of sequentialGroup) {
            const category = this.$store.getters.getCategoryById(block.categoryId);
            const type = ( block.type == 'ELIMINATION' ? 'Elimination' : 'Finals');
            sequentialGroupInfo.push({id: category.id, name: category.name, type: type, status: block.status});
            // blocks.push({id: category.id, name: category.name});
          }
          concurrentGroupInfo.push(sequentialGroupInfo);
        }

        blocksInfo.push(concurrentGroupInfo);
      }

      return {
        index: subscribedTatami.index,
        blocks: blocksInfo,
      };
    }
  },
  methods: {
    subscribeTab: function(index) {
      this.$store.dispatch('subscribeTatami', index);
    },
    tatamiLoaded: function(index, loading, tatami) {
      return !loading && tatami != null && tatami.index == index;
    }
  }
}
</script>

<style>
  .tatami-tab {
    min-height: 100px;
  }

  .tatami-block {
    border-radius: 4px;
    background: #eceff4;
    padding: 10px 20px 10px 20px;
    flex: 1;
    margin: 10px;
  }

  .tatami-block.started {
    background: #a3be8c;
  }

  .tatami-block a, p {
    text-decoration: none;
    color: #4c566a;
    display: block;
    text-align: center;
  }

  .tatami-block a:hover {
    color: #2e3440
  }

  .concurrent-group {
      display: flex;
      align-items: stretch;
  }

  .sequential-group {
      flex: 1;
      display: flex;
      flex-direction: column;
  }

  @media (max-width: 767px) {
    .tatami-block {
      margin: 5px;
    }

    .tatami-block .inner {
      writing-mode: vertical-rl;
    }
  }

</style>
