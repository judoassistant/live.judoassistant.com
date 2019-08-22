<template>
  <div class="match-card">
    <div class="match-card-header">
      <div class="match-title">
        <nuxt-link :to="{ name: 'tournament-categories-category', params: {category: match.combinedId.categoryId}}">{{ categoryName }} - {{ match.title }}</nuxt-link>
      </div>
      <div class="bye" v-if="match.bye">bye</div>
      <div class="expand-button" v-if="!match.bye">
        <a v-on:click="isExpanded = !isExpanded">
          <b-icon v-if="match.status != 'NOT_STARTED'" :icon="isExpanded ? 'chevron-down' : 'chevron-right'" />
        </a>
      </div>
    </div>
    <div class="match-card-content">
      <div>
        <div class="white-name" :class="{winner: match.winner == 'WHITE'}">
          <nuxt-link v-if="match.whitePlayer != null" :to="{ name: 'tournament-players-player', params: {player: match.whitePlayer }}">{{ whiteName }}</nuxt-link>
        </div>
        <div class="white-score" :class="{winner: match.winner == 'WHITE'}" v-if="match.status != 'NOT_STARTED' && !match.bye">
          {{ whiteScore }}
          <span class="penalty-card" :class="{shidoCard: match.whiteScore.shido > 0 && !(match.whiteScore.hansokuMake) , hansokuCard: match.whiteScore.hansokuMake}"></span>
          <span class="penalty-card" :class="{shidoCard: match.whiteScore.shido > 1 && !(match.whiteScore.hansokuMake)}"></span>
        </div>
      </div>
      <div>
        <div v-if="osaekomi == null" class="match-duration" :class="{paused: match.status == 'PAUSED', unpaused: match.status.status == 'UNPAUSED'}">
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
          <span class="penalty-card" :class="{shidoCard: match.blueScore.shido > 0 && !(match.blueScore.hansokuMake), hansokuCard: match.blueScore.hansokuMake}"></span>
          <span class="penalty-card" :class="{shidoCard: match.blueScore.shido > 1 && !(match.blueScore.hansokuMake)}"></span>
        </div>
      </div>
    </div>
    <div class="match-card-footer" v-if="isExpanded">
      <div class="content has-text-grey has-text-centered" v-if="match.events.length == 0">
        {{ match.status == 'NOT_STARTED' ? 'This match has not yet started' : 'No scores have been awarded yet' }}
      </div>
      <div class="columns is-mobile match-events" v-for="event in match.events">
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
</template>

<style>
  .match-card {
    border: 1px solid #dcdcdc;
    margin-bottom: 10px;
    box-shadow: 1px 1px 2px 0px rgba(10, 10, 10, 0.1);
  }

  .match-card-header {
    padding: 20px;
    border-bottom: 1px solid #e8e8e8;
  }

  .match-card-header .bye {
    font-weight: bold;
  }

  .match-card-content {
    padding: 20px;
  }

  .match-card-footer {
    border-top: 1px solid #e8e8e8;
    padding: 20px;
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

  .match-card-header {
    overflow: hidden;
  }

  .match-card-header .match-title {
    float: left;
  }

  .match-card-header .bye {
    float: right;
  }

  .match-card-header .expand-button {
    float: right;
  }

  .match-card-content {
    overflow: hidden;
  }

  .match-card-content > div {
    overflow: hidden;
  }

  .match-card-content .white-name, .blue-name {
    float: left;
  }

  .match-card-content .white-score, .blue-score {
    float: right;
  }

  .match-card-content .match-duration {
    text-align: center;
  }

  .match-card-content .match-osaekomi {
    text-align: center;
  }

  .match-card-content .winner {
    font-weight: bold;
  }

  .match-card-content .paused {
    color: #f4b849;
  }

  .match-card-content .unpaused {
    color: #77af46;
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
      if (type == 'IPPON')
        return 'Ippon';
      if (type == 'WAZARI')
        return 'Wazari';
      if (type == 'SHIDO')
        return 'Shido';
      if (type == 'HANSOKU_MAKE')
        return 'Hansoku Make';
      if (type == 'IPPON_OSAEKOMI')
        return 'Ippon (Osaekomi)';
      if (type == 'WAZARI_OSAEKOMI')
        return 'Wazari (Osaekomi)';
      if (type == 'CANCEL_IPPON')
        return 'Cancel Ippon';
      if (type == 'CANCEL_WAZARI')
        return 'Cancel Wazari';
      if (type == 'CANCEL_SHIDO')
        return 'Cancel Shido';
      if (type == 'CANCEL_HANSOKU_MAKE')
        return 'Cancel Hansoku-Make';
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
    categoryName() {
      const id = this.match.combinedId.categoryId
      const category = this.$store.getters.getCategoryById(id);
      return category.name;
    },
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
      return (this.match.whiteScore.ippon ? 1 : 0) + " " + this.match.whiteScore.wazari;
    },
    blueScore() {
      if (this.match.status == 'NOT_STARTED')
        return "";
      return (this.match.blueScore.ippon ? 1 : 0) + " " + this.match.blueScore.wazari;
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

