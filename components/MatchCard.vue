<template>
  <div class="match-card">
    <div class="card">
      <div class="card-content match-header">
        <div>
          <div class="match-title">
            <a v-on:click="isExpanded = !isExpanded"><b-icon :icon="isExpanded ? 'chevron-down' : 'chevron-right'"></b-icon></a>
            {{ match.title }}
          </div>
          <div class="bye" v-if="match.bye">bye</div>
        </div>
        <div>
          <div class="white-name" :class="{winner: match.winner == 'WHITE'}">
            <nuxt-link v-if="match.whitePlayer != null" :to="{ name: 'tournament-players-player', params: {player: match.whitePlayer }}">{{ whiteName }}</nuxt-link>
          </div>
          <div class="white-score" :class="{winner: match.winner == 'WHITE'}" v-if="match.status != 'NOT_STARTED' && !match.bye">
            {{ whiteScore }}
            <span class="penalty-card" :class="{shidoCard: match.whiteScore.shido > 0 && match.whiteScore.hansokuMake == 0, hansokuCard: match.whiteScore.hansokuMake > 0}"></span>
            <span class="penalty-card" :class="{shidoCard: match.whiteScore.shido > 1 && match.whiteScore.hansokuMake == 0}"></span>
          </div>
        </div>
        <div>
          <div v-if="osaekomi == null" class="match-duration" :class="{unfinished: match.status != 'FINISHED'}">
            {{ match.status != 'NOT_STARTED' ? formatDuration(duration) : "" }}
          </div>
          <div v-if="osaekomi != null" class="match-osaekomi">
            OSK {{ formatOsaekomi(osaekomi) }}
          </div>
        </div>
        <div>
          <div class="blue-name" :class="{winner: match.winner == 'BLUE'}">
            <nuxt-link v-if="match.bluePlayer != null" :to="{ name: 'tournament-players-player', params: {player: match.bluePlayer }}">{{ blueName }}</nuxt-link>
          </div>
          <div class="blue-score" :class="{winner: match.winner == 'BLUE'}" v-if="match.status != 'NOT_STARTED' && !match.bye">
            {{ blueScore }}
            <span class="penalty-card" :class="{shidoCard: match.blueScore.shido > 0 && match.blueScore.hansokuMake == 0, hansokuCard: match.blueScore.hansokuMake > 0}"></span>
            <span class="penalty-card" :class="{shidoCard: match.blueScore.shido > 1 && match.blueScore.hansokuMake == 0}"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="isExpanded">
      <div class="card-content match-events">
        <div class="content has-text-grey has-text-centered" v-if="match.events.length == 0">
          {{ match.status == 'NOT_STARTED' ? 'This match has not yet started' : 'No scores have been awarded yet' }}
        </div>
        <div class="columns is-mobile" v-for="event in match.events">
          <div class="column white-event">
            {{ event.playerIndex == 'WHITE' ? formatEventType(event.type) : "" }}
          </div>
          <div class="column is-2 duration-event">
            {{ formatDuration(event.duration) }}
          </div>
          <div class="column blue-event">
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

  .match-header .unfinished {
    color: green;
  }

  .match-header .bye {
    font-weight: bold;
  }

  .match-header > div {
    overflow: hidden;
  }

  .match-header .match-title {
    float: left;
  }

  .match-header .bye {
    float: right;
  }

  .match-header .white-name, .blue-name {
    float: left;
  }

  .match-header .white-score, .blue-score {
    float: right;
  }

  .match-header .match-duration {
    text-align: center;
  }

  .match-header .match-osaekomi {
    text-align: center;
  }

  .match-header .winner {
    font-weight: bold;
  }

  .penalty-card {
    display: inline-block;
    width: 8px;
    height: .8em;
    margin-left: 7px;
  }

  .shidoCard {
    background: #ebcb8b;
  }

  .hansokuCard {
    background: #bf616a;
  }

  .match-events .white-event {
    text-align: right;
  }

  .match-events .duration-event {
    text-align: center;
  }

  .match-events .blue-event {
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
      duration: 0,
      osaekomi: null,
      interval: null,
    }
  },
  props: ['match', 'size'],
  methods: {
    calcDuration() {
      if (this.match.status != 'UNPAUSED')
        return this.match.duration;

      const diff = Date.now() - new Date(this.match.resumeTime);
      return this.match.duration + diff;
    },
    calcOsaekomi() {
      if (this.match.osaekomi == null)
        return null;

      return Date.now() - new Date(this.match.osaekomi.start);
    },
    formatOsaekomi(osaekomi) {
      const seconds = Math.floor(osaekomi / 1000);
      return pad(seconds,2);
    },
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
      if (type == 'IPPON_OSAEKOMI')
        return 'Ippon (Osaekomi)';
      if (type == 'WAZARI_OSAEKOMI')
        return 'Wazari (Osaekomi)';
    }
  },
  mounted() {
    this.duration = this.calcDuration();
    this.osaekomi = this.calcOsaekomi();
    this.interval = setInterval(() => {
      this.duration = this.calcDuration();
      this.osaekomi = this.calcOsaekomi();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    whiteName() {
      const id = this.match.whitePlayer;
      if (id == null)
        return "";
      const player = this.$store.getters.getPlayerById(id);
      return player.name;
    },
    whiteScore() {
      if (this.match.status == 'NOT_STARTED')
        return "";
      return this.match.whiteScore.ippon + " " + this.match.whiteScore.wazari;
    },
    blueScore() {
      if (this.match.status == 'NOT_STARTED')
        return "";
      return this.match.blueScore.ippon + " " + this.match.blueScore.wazari;
    },
    blueName() {
      const id = this.match.bluePlayer;
      if (id == null)
        return "";
      const player = this.$store.getters.getPlayerById(id);
      return player.name;
    },
  },
}
</script>

