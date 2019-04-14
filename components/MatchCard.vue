<template>
  <div class="match-card">
    <div class="card">
      <div class="card-content match-header">
        <div class="columns">
          <div class="column">
            <a v-on:click="isExpanded = !isExpanded"><b-icon :icon="isExpanded ? 'menu-down' : 'menu-right'"></b-icon></a> {{ match.title }}
          </div>
          <div class="column">
            <nuxt-link v-if="match.whitePlayer != null" :to="{ name: 'tournament-players-player', params: {player: match.whitePlayer }}">{{ whiteName }}</nuxt-link>
          </div>
          <div class="column">
            <strong>{{ whiteScore }}</strong>
          </div>
          <div class="column">
            {{ match.status != "NOT_STARTED" ? formatDuration(match.duration) : "" }}
          </div>
          <div class="column">
            {{ blueScore }}
          </div>
          <div class="column">
            <nuxt-link v-if="match.bluePlayer != null" :to="{ name: 'tournament-players-player', params: {player: match.bluePlayer }}">{{ blueName }}</nuxt-link>
          </div>
          <div class="column">
            <strong v-if="match.bye">bye</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="isExpanded">
      <div class="card-content match-events">
        <div class="content has-text-grey has-text-centered" v-if="match.events.length == 0">
          {{ match.status == 'NOT_STARTED' ? 'This match has not yet started' : 'No scores have been awarded yet' }}
        </div>
        <div class="columns" v-for="event in match.events">
          <div class="column">
            {{ event.playerIndex == 'WHITE' ? formatEventType(event.type) : "" }}
          </div>
          <div class="column">
            {{ formatDuration(event.duration) }}
          </div>
          <div class="column">
            {{ event.playerIndex == 'BLUE' ? formatEventType(event.type) : "" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .match-card {
    margin-bottom: 10px;
  }


  .match-header .columns .column:nth-child(2) { /* White player name */
    text-align: right;
  }

  .match-header .columns .column:nth-child(4) { /* Match duration */
    text-align: center;
  }

  .match-header .columns .column:nth-child(5) { /* Blue player score */
    text-align: right;
  }

  .match-header .columns .column:nth-child(6) { /* Blue player name */
    text-align: left;
  }

  .match-header .columns .column:nth-child(7) { /* Is Bye */
    text-align: right;
  }

  .match-events .columns .column:nth-child(1) {
    text-align: right;
  }

  .match-events .columns .column:nth-child(2) {
    text-align: center;
  }

  .match-events .columns .column:nth-child(3) {
    text-align: left;
  }
</style>

<script>
function pad(n, size) {
  var s = String(n);
  while (s.length < (size))
    s = "0" + s;
  return s;
}

export default {
  data() {
    return {
      isExpanded: false,
    }
  },
  props: ['match'],
  methods: {
    formatDuration(duration) {
      const seconds = Math.floor(duration / 1000) % 60;
      const minutes = Math.floor(duration / (1000 * 60));
      return pad(minutes, 2) + ":" + pad(seconds,2);
    },
    formatEventType(type) {
      if (type == 'WAZARI')
        return 'Wazari';
      if (type == 'IPPON')
        return 'Ippon';
      if (type == 'HANSOKU_MAKE')
        return 'Hansoku Make';
      if (type == 'SHIDO')
        return 'Shido';
    }
  },
  computed: {
    whiteName() {
      const id = this.match.whitePlayer;
      if (id == null)
        return "";
      const player = this.$store.state.players.get(id);
      return player.firstName + ' ' + player.lastName;
    },
    whiteScore() {
      if (this.match.whitePlayer == null)
        return "";
      return this.match.whiteScore.ippon + " " + this.match.whiteScore.wazari;
    },
    blueScore() {
      if (this.match.bluePlayer == null)
        return "";
      return this.match.blueScore.ippon + " " + this.match.blueScore.wazari;
    },
    blueName() {
      const id = this.match.bluePlayer;
      if (id == null)
        return "";
      const player = this.$store.state.players.get(id);
      return player.firstName + ' ' + player.lastName;
    },
  },
}
</script>
