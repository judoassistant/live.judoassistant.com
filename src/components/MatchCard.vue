<template>
  <div class="match-card">
    <div class="match-card-header">
      <p class="match-card-category">A4 <span>Pool</span></p>
      <p class="match-card-time"><span class="golden-score">GS</span> 3:51</p>
    </div>
    <div class="match-card-body">
      <div>
        <div class="match-card-player">
          <p class="match-card-name">Jens Jensen</p>
          <p class="match-card-club">Aarhus Judo Klub</p>
        </div>
        <div class="match-card-penalties"></div>
        <p class="match-card-score">Ippon</p>
      </div>
      <div class="winner">
        <div class="match-card-player">
          <p class="match-card-name">Hans Hansen</p>
          <p class="match-card-club">Kodokan Odense</p>
        </div>
        <div class="match-card-penalties"></div>
        <p class="match-card-score">1</p>
      </div>
    </div>
    <div class="match-card-events">
      <div class="match-card-event">
        <p class="match-card-event-white">Wazari</p>
        <p class="match-card-event-time">01:59</p>
        <p class="match-card-event-blue"></p>
      </div>
      <div class="match-card-event">
        <p class="match-card-event-white">Wazari</p>
        <p class="match-card-event-time">02:28</p>
        <p class="match-card-event-blue">Wazari</p>
      </div>
      <div class="match-card-event">
        <p class="match-card-event-white"></p>
        <p class="match-card-event-time">02:50</p>
        <p class="match-card-event-blue">Wazari (Osaekomi)</p>
      </div>
    </div>
    <a class="match-card-button" href="#">
      <span class="mdi mdi-menu-down"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MatchCard',
  props: {
    match: Object,
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  .match-card {
    border: 1px solid #e5e9f0;
    margin: 15px 0;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 5px 15px 0px;
  }

  .match-card p {
    margin: 0;
    padding: 0;
    /* border: 1px dashed green; */
    display: block;
  }

  .match-card-header {
    /* border-bottom: 1px solid #e5e9f0; */
    /* border-bottom: 2px solid #ebcb8b; */
    border-bottom: 2px solid #a3be8c;
    padding: 10px 16px;
    display: flex;
    flex-direction: row;
  }

  .match-card-body {
    padding: 10px 16px;
  }

  .match-card-header .match-card-category {
    flex-grow: 1;
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

  .match-card .winner .match-card-name {
    font-weight: 400;
  }

  .match-card .winner .match-card-score {
    font-weight: 400;
  }

  .match-card-score {
    text-transform: uppercase;
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
    border-top: 1px solid #e5e9f0;
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

  .match-card-event-blue {
    flex-grow: .5;
    text-align: left;
  }

  .match-card-button {
    display: block;
    border-top: 1px solid #e5e9f0;
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

