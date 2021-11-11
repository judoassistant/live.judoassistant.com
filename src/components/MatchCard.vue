<template>
  <div class="match-card">
    <div :class="{'match-card-header': true, 'paused': match.status == 'PAUSED', 'unpaused': match.status == 'UNPAUSED'}">
      <p class="match-card-category">
        <router-link :to="{ name: 'tournament-category', params: { tournament: this.$route.params.tournament, categoryId: category.id }}">{{ category.name }}</router-link>
        <span>{{ match.title }}</span>
      </p>
      <p class="match-card-time">
        <span v-if="match.goldenScore && !match.osaekomi" class="golden-score">GS</span>
        <span v-if="match.osaekomi" class="osaekomi">OSK</span>
        {{ (match.status != 'NOT_STARTED' && !match.osaekomi) ? formatClock(clock) : "" }}
        {{ match.osaekomi ? formatOsaekomi(osaekomi) : "" }}
      </p>
    </div>
    <div class="match-card-body">
      <div :class="{winner: match.winner == 'WHITE'}">
        <div class="match-card-player" v-if="whitePlayer != null">
          <router-link class="match-card-name" :to="{ name: 'tournament-player', params: { tournament: this.$route.params.tournament, playerId: whitePlayer.id }}">
            {{ whitePlayer.firstName }} {{ whitePlayer.lastName }}
          </router-link>
          <p class="match-card-club">{{ whitePlayer.club }}</p>
        </div>
        <div class="match-card-penalties"></div>
            <div class="match-card-penalties">
              <span v-if="match.whiteScore.hansokuMake" class="hansoku"></span>
              <span v-if="match.whiteScore.shido > 0 && !match.whiteScore.hansokuMake" class="shido"></span>
              <span v-if="match.whiteScore.shido > 1 && !match.whiteScore.hansokuMake" class="shido"></span>
            </div>
        <p class="match-card-score">{{ whiteScore }}</p>
      </div>
      <div :class="{winner: match.winner == 'BLUE'}">
        <div class="match-card-player" v-if="bluePlayer != null">
          <router-link class="match-card-name" :to="{ name: 'tournament-player', params: { tournament: this.$route.params.tournament, playerId: bluePlayer.id }}">
            {{ bluePlayer.firstName }} {{ bluePlayer.lastName }}
          </router-link>
          <p class="match-card-club">{{ bluePlayer.club }}</p>
        </div>
        <div class="match-card-penalties">
          <span v-if="match.blueScore.hansokuMake" class="hansoku"></span>
          <span v-if="match.blueScore.shido > 0 && !match.blueScore.hansokuMake" class="shido"></span>
          <span v-if="match.blueScore.shido > 1 && !match.blueScore.hansokuMake" class="shido"></span>
        </div>
        <p class="match-card-score">{{ blueScore }}</p>
      </div>
    </div>
    <div class="match-card-events" v-if="isExpanded">
      <p v-if="match.events.length == 0" class="match-card-empty-message">
        {{ match.status == 'NOT_STARTED' ? 'This match has not yet started' : 'No scores have been awarded yet' }}
      </p>
      <div v-for="(event, index) in match.events" :key="index" class="match-card-event">
        <p class="match-card-event-white">
          {{ event.playerIndex == 'WHITE' ? eventTypeFilter(event.type) : "" }}
        </p>
        <p class="match-card-event-time">
          {{ formatClock(event.duration) }}
        </p>
        <p class="match-card-event-blue">
          {{ event.playerIndex == 'BLUE' ? eventTypeFilter(event.type) : "" }}
        </p>
      </div>
    </div>
    <a class="match-card-button" @click.prevent="isExpanded = !isExpanded" href="#">
      <span :class="{'mdi': true, 'mdi-menu-down': !isExpanded, 'mdi-menu-up': isExpanded}"></span>
    </a>
  </div>
</template>

<script>
import { eventTypeFilter } from '@/store/filters.js'

function pad(n, size) {
  var s = String(n);
  while (s.length < (size))
    s = "0" + s;
  return s;
}

export default {
  name: 'MatchCard',
  data() {
    return {
      isExpanded: false,
      clock: 0,
      osaekomi: null,
      interval: null,
    }
  },
  props: {
    match: Object,
  },
  methods: {
    eventTypeFilter: eventTypeFilter,
    formatClock(duration) {
      const seconds = Math.floor(duration / 1000) % 60;
      const minutes = Math.floor(duration / (1000 * 60));
      return pad(minutes, 2) + ":" + pad(seconds,2);
    },
    formatOsaekomi(osaekomi) {
      const seconds = Math.floor(osaekomi / 1000);
      return pad(seconds,2);
    },
    calcClock() {
      const clockDiff = this.$store.state.clockDiff;
      var duration = this.match.duration;
      if (this.match.status  == 'UNPAUSED')
        duration += Date.now() - new Date(this.match.resumeTime - clockDiff);

      if (this.match.goldenScore)
        return duration - this.match.normalTime;
      if (this.match.status == 'FINISHED')
        return duration;

      const clock = this.match.normalTime - duration;

      if (clock < 0)
        return 0;

      return clock;
    },
    calcOsaekomi() {
      if (this.match.osaekomi == null)
        return null;

      return Date.now() - new Date(this.match.osaekomi.start);
    },
  },
  mounted() {
    this.clock = this.calcClock();
    this.osaekomi = this.calcOsaekomi();
    this.interval = setInterval(() => {
      this.clock = this.calcClock();
      this.osaekomi = this.calcOsaekomi();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  computed: {
    category() {
      const id = this.match.combinedId.categoryId;
      return this.$store.getters.getCategory(id);
    },
    whitePlayer() {
      const id = this.match.whitePlayer;
      if (id == null)
        return null;
      return this.$store.getters.getPlayer(id);
    },
    bluePlayer() {
      const id = this.match.bluePlayer;
      if (id == null)
        return null;
      return this.$store.getters.getPlayer(id);
    },
    whiteScore() {
      if (this.match.status == 'NOT_STARTED')
        return "";
      if (this.match.whiteScore.ippon)
        return "Ippon";
      return this.match.whiteScore.wazari;
    },
    blueScore() {
      if (this.match.status == 'NOT_STARTED')
        return "";
      if (this.match.blueScore.ippon)
        return "Ippon";
      return this.match.blueScore.wazari;
    },
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";

  .match-card {
    border: 1px solid $color6;
    margin: 15px 0;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px;
  }

  .match-card p {
    margin: 0;
    padding: 0;
    display: block;
  }

  .match-card-header {
    border-bottom: 1px solid $color6;
    padding: 10px 16px;
    display: flex;
    flex-direction: row;
  }

  .match-card-header.paused {
    border-bottom: 2px solid #ebcb8b;
  }

  .match-card-header.unpaused {
    border-bottom: 2px solid #a3be8c;
  }

  .match-card-body {
    padding: 10px 16px;
  }

  .match-card-header .match-card-category {
    flex-grow: 1;
  }

  .match-card-header .match-card-category a {
    color: $color1;
  }

  .match-card-header .match-card-category span {
    color: $color4;
    font-size: .9em;
    padding-left: 10px;
  }

  .match-card-body > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .match-card .match-card-name {
    color: $color1;
  }

  .match-card .winner .match-card-name {
    font-weight: 400;
  }

  .match-card .winner .match-card-score {
    font-weight: 400;
  }

  .match-card-club {
    color: $color4;
    font-size: .9em;
  }

  .match-card-score, .match-card-time {
    flex-basis: 100px;
  }

  .match-card-player {
    display: block;
    flex-grow: 1;
  }

  .match-card .golden-score, .match-card .osaekomi, .match-card .bye {
    font-size: .8em;
    color: $color4;
    text-transform: uppercase;
  }

  .match-card-penalties {
    display: flex;
    flex-direction: row;
    padding-right: 18px;
  }

  .match-card .shido, .match-card .hansoku {
    display: block;
    height: .9em;
    width: .5em;
    margin-left: 10px;
  }

  .match-card .shido {
    background: #ebcb8b;
  }

  .match-card .hansoku {
    background: #bf616a;
  }

  .match-card-events {
    border-top: 1px solid $color6;
    padding: 10px 16px;
  }

  .match-card-event {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .match-card-event p {
    display: block;
    flex-basis: 150px;
  }

  .match-card-event-white {
    flex-grow: .5;
    text-align: right;
  }

  .match-card-event-time {
    flex-basis: 100px;
    text-align: center;
    color: $color4;
    font-size: .8em;
  }

  .match-card-empty-message {
    text-align: center;
    color: $color4;
    font-size: .9em;
  }

  .match-card-event-blue {
    flex-grow: .5;
    text-align: left;
  }

  .match-card-button {
    display: block;
    border-top: 1px solid $color6;
    text-align: center;
    transition: 0.2s;
    color: #788296;
    font-size: .8em;
    line-height: 12px;
  }

  .match-card-button:hover {
    background: #eceff4;
  }
</style>

