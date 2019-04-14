<template>
  <div class="match-card">
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <a v-on:click="isExpanded = !isExpanded"><b-icon :icon="isExpanded ? 'menu-down' : 'menu-up'"></b-icon></a> {{ match.title }}
          </div>
          <div class="column">
            <strong>{{ whiteName }}</strong>
          </div>
          <div class="column">
            <strong>{{ whiteScore }}</strong>
          </div>
          <div class="column">
            {{ duration }}
          </div>
          <div class="column">
            1 0
          </div>
          <div class="column">
            {{ blueName }}
          </div>
          <div class="column">
            <strong v-if="match.bye">bye</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="isExpanded">
      <div class="card-content">
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <td>Shido</td>
              <td>1:10</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>1:56</td>
              <td>Wazari</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
  .match-card .columns .column:nth-child(2) { /* White player name */
    text-align: right;
  }

  .match-card .columns .column:nth-child(4) { /* Match duration */
    text-align: center;
  }

  .match-card .columns .column:nth-child(5) { /* Blue player score */
    text-align: right;
  }

  .match-card .columns .column:nth-child(6) { /* Blue player name */
    text-align: left;
  }

  .match-card .columns .column:nth-child(7) { /* Is Bye */
    text-align: right;
  }

  .match-card {
    margin-bottom: 10px;
  }

  .match-card td {
    border: none;
  }

  .match-card td:nth-child(1) {
    text-align: right;
  }

  .match-card td:nth-child(2) {
    text-align: center;
  }

  .match-card td:nth-child(3) {
    text-align: left;
  }
</style>
<script>
export default {
  data() {
    return {
      isExpanded: false
    }
  },
  props: ['match'],
  methods: {
  },
  computed: {
    whiteName() {
      const id = this.match.whitePlayer;
      const player = this.$store.state.players.get(id);
      return player.firstName + ' ' + player.lastName;
    },
    whiteScore() {
      return this.match.whiteScore.ippon + " " + this.match.whiteScore.wazari;
    },
    blueScore() {
      return this.match.blueScore.ippon + " " + this.match.blueScore.wazari;
    },
    blueName() {
      const id = this.match.bluePlayer;
      const player = this.$store.state.players.get(id);
      return player.firstName + ' ' + player.lastName;
    },
    duration() {
      return this.match.duration;
    }
  },
}
</script>

