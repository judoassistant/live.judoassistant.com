<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><nuxt-link :to="{ name: 'index' }">JudoAssistant</nuxt-link></li>
          <li><nuxt-link :to="{ name: 'tournament', params: {tournament: this.$route.params.tournament }}">{{ tournament.name }}</nuxt-link></li>
          <li class="is-active"><a href="#" aria-current="page">Tatamis</a></li>
        </ul>
      </nav>
      <h1 class="title">{{ tournament.name }}</h1>
      <h2 class="subtitle">Tatamis</h2>
      <b-tabs @change=subscribeTab>
        <b-tab-item :label="'Tatami ' + tatamiIndex" v-for="tatamiIndex in tatamiCount" :key="tatamiIndex" class="tatami-tab">
          <b-loading :is-full-page=false :active=true v-if="!tatamiLoaded(tatamiIndex - 1, loading, tatami)"></b-loading>
          <div v-if="tatamiLoaded(tatamiIndex - 1, loading, tatami)">
            <div class="tile is-ancestor" v-for="concurrentGroup in tatami.blocks">
              <div class="tile is-parent is-vertical" v-for="sequentialGroup in concurrentGroup">
                <div class="tile is-child tatami-block" :class="{finished: block.status == 'FINISHED', started: block.status == 'STARTED', notstarted: block.status == 'NOT_STARTED'}" v-for="block in sequentialGroup ">
                  <nuxt-link :to="{ name: 'tournament-categories-category', params: {category: block.id}}">{{ block.name }}</nuxt-link>
                  <p>({{block.type}})</p>
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
            const type = block.type.charAt(0) + block.type.slice(1).toLowerCase();
            sequentialGroupInfo.push({id: category.id, name: category.name, type: type, status: block.status});
            // blocks.push({id: category.id, name: category.name});
          }
          concurrentGroupInfo.push(sequentialGroupInfo);
        }

        blocksInfo.push(concurrentGroupInfo);
      }

      console.log(blocksInfo);

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
    background: #d8dee9;
    padding: 10px 20px 10px 12px;
  }

  .tatami-block.started {
    background: #a3be8c;
  }

  .tatami-block.finished {
    background: #d08770;
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

</style>
