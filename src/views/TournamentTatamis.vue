<template>
  <h2>Tatamis</h2>
  <div class="concurrent-group">
    <div class="sequential-group">
      <div class="tatami-block">
        <div class="tatami-block-inner">
          <a href="#">A10</a>
          <p>Elimination</p>
        </div>
      </div>
      <div class="tatami-block started">
        <div class="tatami-block-inner">
          <a href="#">A10</a>
          <p>Elimination</p>
        </div>
      </div>
      <div class="tatami-block finished">
        <div class="tatami-block-inner">
          <a href="#">A10</a>
          <p>Elimination (Finished)</p>
        </div>
      </div>
    </div>
    <div class="sequential-group">
      <div class="tatami-block">
        <div class="tatami-block-inner">
          <a href="#">A10</a>
          <p>Elimination</p>
        </div>
      </div>
      <div class="tatami-block">
        <div class="tatami-block-inner">
          <a href="#">A10</a>
          <p>Elimination</p>
        </div>
      </div>
      <div class="tatami-block">
        <div class="tatami-block-inner">
          <a href="#">A10</a>
          <p>Elimination</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* <TabItem :label="'Tatami ' + (index + 1)" :key="index" v-for="(matches, index) of tatamiMatches"> */
import { mapState } from 'vuex'

export default {
  components: {},
  mounted() {
    this.$store.dispatch('subscribeTatami', 0);
  },
  methods: {
    changeTab: function(index) {
      this.$store.dispatch('subscribeTatami', index);
    },
  },
  computed: {
    ...mapState({
      tournament: state => state.tournament,
    }),
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  .concurrent-group {
    display: flex;
    align-items: stretch;
  }

  .sequential-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tatami-block {
    border: 1px solid #e5e9f0; /* Move into colors module */
    margin: 0 5px 10px 5px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px;
    padding: 10px 0;
  }

  .tatami-block.finished {
    border-left: 5px solid #a3be8c;
  }

  .tatami-block.started {
    border-left: 5px solid #ebcb8b;
  }

  .tatami-block a, .tatami-block p {
    display: block;
    text-align: center;
    margin: 0;
  }

  .tatami-block a {
    color: $color1;
  }

  .tatami-block p {
    color: $color4;
    font-size: .9em;
  }

  @media (max-width: 767px) {
    .tatami-block {
      margin: 5px;
    }

    .tatami-block-inner {
      writing-mode: vertical-rl;
    }
  }
</style>
