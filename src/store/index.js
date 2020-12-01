import { createStore } from 'vuex'

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
    tournaments: null,
    tournamentsState: loading_state.NOT_LOADED,
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
          commit('setTournamentsState', loading_state.LOADED)
          commit('setTournaments', message.tournaments)
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
    subscribeTournament({ commit, state }) {
      commit('setTournamentState', loading_state.LOADING);
      delayedSend(state.connection, 'listTournaments')
    },
  },
  modules: {
  }
})
