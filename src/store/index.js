import { createStore } from 'vuex'
import { mapId } from '@/store/helpers.js'

function delayedSend(socket, message) {
  if (socket.readyState == 1) {
    socket.send(message);
    return;
  }

  socket.addEventListener('open', () => {
    socket.send(message);
  });
}

const connection_state = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
};

const loading_state = {
  NOT_LOADED: 'NOT_LOADED',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
};

export default createStore({
  state: {
    connectionState: connection_state.NOT_CONNECTED,
    connection: null,
    clockSyncBegin: 0,
    clockDiff: 0,

    // List of tournaments
    tournamentsState: loading_state.NOT_LOADED,
    tournaments: null,

    // Subscribed tournament
    tournamentState: loading_state.NOT_LOADED,
    tournament: null,
    categories: null,
    players: null,
    tatamis: null,
    matches: null,

    // Subscribed player
    playerState: loading_state.NOT_LOADED,
    player: null,

    // Subscribed category
    categoryState: loading_state.NOT_LOADED,
    category: null,
  },
  mutations: {
    setConnectionState(state, connectionState) {
      state.connectionState = connectionState;
    },
    setConnection(state, connection) {
      state.connection = connection;
    },
    setClockDiff(state, diff) {
      state.clockDiff = diff;
    },
    setClockSyncBegin(state, time) {
      state.clockSyncBegin = time;
    },
    setTournamentsState(state, tournamentsState) {
      state.tournamentsState = tournamentsState;
    },
    setTournaments(state, tournaments) {
      state.tournaments = tournaments;
    },
    setTournamentState(state, tournamentState) {
      state.tournamentState = tournamentState;
    },
    setTournament(state, payload) {
      if (payload == null) {
        state.tournament = null;
        state.categories = null;
        state.players = null;
        state.tatamis = null;
        return;
      }

      state.tournament = payload.tournament;

      // Create maps
      var categories = new Map();
      for (const category of payload.categories)
        categories.set(category.id, category);

      var players = new Map();
      for (const player of payload.players)
        players.set(player.id, player);

      var tatamis = payload.tatamis;

      var matches = new Map();
      for (const match of payload.matches)
        matches.set(mapId(match.combinedId), match);

      state.categories = categories;
      state.players = players;
      state.tatamis = tatamis;
      state.matches = matches;
    },
    setCategoryState(state, categoryState) {
      state.categoryState = categoryState;
    },
    setCategory(state, payload) {
      if (payload == null) {
        state.category = null;
        return;
      }

      state.category = payload.subscribedCategory;
      for (const match of payload.matches)
        state.matches.set(match.id, match);
      // TODO: Ensure state.matches cleanup
    },
    setPlayerState(state, playerState) {
      state.playerState = playerState;
    },
    setPlayer(state, payload) {
      if (payload == null) {
        state.player = null;
        return;
      }

      state.player = payload.subscribedPlayer;
      for (const match of payload.matches)
        state.matches.set(match.id, match);
      // TODO: Ensure state.matches cleanup
    },
  },
  actions: {
    connect({ commit, state }) {
      commit('setConnectionState', connection_state.CONNECTING);

      const connection = new WebSocket('ws://localhost:9001');

      connection.onopen = function() {
        commit('setConnectionState', connection_state.CONNECTED);
        commit('setClockSyncBegin', Date.now());

        connection.send('clock');
      }

      connection.onmessage = function(event) {
        const message = JSON.parse(event.data);

        if (message.type == 'clock') {
          const t1 = state.clockSyncBegin;
          const t2 = message.clock;
          const t3 = Date.now();
          const latency = (t3 - t1) / 2;
          const diff = t2 - (t1 + latency);

          commit('setClockDiff', diff);
          commit('setClockSyncBegin', 0);
        }
        else if (message.type == 'tournamentListing') {
          commit('setTournamentsState', loading_state.LOADED);
          commit('setTournaments', message.tournaments);
        }
        else if (message.type == 'tournamentSubscription') {
          commit('setTournamentState', loading_state.LOADED);
          commit('setTournament', message);
        }
        else if (message.type == 'tournamentSubscriptionFail') {
          // TODO: Have a fail state
          commit('setTournamentState', loading_state.NOT_LOADED);
          commit('setTournament', null);
        }
        else if (message.type == 'playerSubscription') {
          commit('setPlayerState', loading_state.LOADED);
          commit('setPlayer', message);
        }
        else if (message.type == 'playerSubscriptionFail') {
          commit('setPlayerState', loading_state.NOT_LOADED);
          commit('setPlayer', null);
        }
        else if (message.type == 'categorySubscription') {
          commit('setCategoryState', loading_state.LOADED);
          commit('setCategory', message);
        }
        else if (message.type == 'categorySubscriptionFail') {
          commit('setCategoryState', loading_state.NOT_LOADED);
          commit('setCategory', null);
        }
      }

      connection.onerror = function() {
        commit('setConnectionState', connection_state.NOT_CONNECTED);
        commit('setConnection', null);
      }

      connection.onclose = function() {
        commit('setConnectionState', connection_state.NOT_CONNECTED);
        commit('setConnection', null);
      }

      commit('setConnection', connection);
    },
    fetchTournaments({ commit, state }) {
      commit('setTournamentsState', loading_state.LOADING);
      delayedSend(state.connection, 'listTournaments')
    },
    subscribeTournament({ commit, state }, webName) {
      commit('setTournamentState', loading_state.LOADING);
      delayedSend(state.connection, 'subscribeTournament ' + webName)
    },
    subscribeCategory({ commit, state }, webName) {
      commit('setCategoryState', loading_state.LOADING);
      delayedSend(state.connection, 'subscribeCategory ' + webName)
    },
    subscribePlayer({ commit, state }, webName) {
      commit('setPlayerState', loading_state.LOADING);
      delayedSend(state.connection, 'subscribePlayer ' + webName)
    },
  },
  getters: {
    tatamiMatches(state)  {
      var res = [];
      for (const tatami of state.tatamis) {
        var matches = [];
        for (const combinedId of tatami.matches) {
          const match = state.matches.get(mapId(combinedId));

          if (match.bye)
            continue;
          matches.push(match);
        }
        res.push(matches);
      }

      return res;
    }
  },
  modules: {
  },
})
