import { createStore } from 'vuex'
import { mapId, playerMatchesComparator } from '@/store/helpers.js'

function delayedSend(socket, message) {
  if (socket.readyState == 1) {
    socket.send(message);
    return;
  }

  socket.addEventListener('open', () => {
    socket.send(message);
  });
}

function mergeMatches(state, matches) {
  // Compute ids to be kept
  const matchIds = new Set();
  if (state.player != null) {
    for (const combinedId of state.player.matches)
      matchIds.add(mapId(combinedId));
  }

  if (state.category != null) {
    for (const combinedId of state.category.matches)
      matchIds.add(mapId(combinedId));
  }

  for (const tatami of state.tatamis) {
    for (const combinedId of tatami.matches)
      matchIds.add(mapId(combinedId));
  }

  for (const match of state.matches.values()) {
    const matchId = mapId(match.combinedId);
    if (!matchIds.has(matchId))
      state.matches.delete(matchId);
  }

  // Update matches with changed matches
  for (const match of matches) {
    const matchId = mapId(match.combinedId);
    state.matches.set(matchId, match);
  }
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
    pastTournaments: null,
    upcomingTournaments: null,

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

    // Subscribed tatami
    tatamiState: loading_state.NOT_LOADED,
    tatami: null,
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
    setTournaments(state, payload) {
      if (payload == null) {
        state.pastTournaments = [];
        state.upcomingTournaments = [];
        return;
      }

      state.pastTournaments = payload.pastTournaments.map((tournament) => { return {...tournament, date: new Date(tournament.date), } });
      state.upcomingTournaments = payload.upcomingTournaments.map((tournament) => { return {...tournament, date: new Date(tournament.date), } });
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
      state.tournament.date = new Date(payload.tournament.date);

      state.tatamis = payload.tatamis;

      // Map categories
      var categories = new Map();
      for (const category of payload.categories)
        categories.set(category.id, category);
      state.categories = categories;

      // Map players
      var players = new Map();
      for (const player of payload.players)
        players.set(player.id, player);
      state.players = players;

      // Map matches
      var matches = new Map();
      for (const match of payload.matches)
        matches.set(mapId(match.combinedId), match);
      state.matches = matches;
    },
    changeTournament(state, payload) {
      if ('tournament' in payload) {
        state.tournament = payload.tournament;
        state.tournament.date = new Date(payload.tournament.date);
      }

      // Update categories
      for (const categoryId of payload.erasedCategories)
        state.categories.delete(categoryId);
      for (const category of payload.categories)
        state.categories.set(category.id, category);

      if ('subscribedCategory' in payload)
        state.category = payload.subscribedCategory;

      // Update players
      for (const playerId of payload.erasedPlayers)
        state.players.delete(playerId);
      for (const player of payload.players)
        state.players.set(player.id, player);

      if ('subscribedPlayer' in payload)
        state.player = payload.subscribedPlayer;

      // Update tatamis
      var tatamis = [];
      var j = 0;
      for (var i = 0; i < state.tatamis.length; ++i) {
        if (j < payload.tatamis.length && payload.tatamis[j].index == i) {
          tatamis.push(payload.tatamis[j]);
          ++j;
        } else {
          tatamis.push(state.tatamis[i]);
        }
      }
      state.tatamis = tatamis;

      if ('subscribedTatami' in payload)
        state.tatami = payload.subscribedTatami;

      // Update matches
      mergeMatches(state, payload.matches);
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
      mergeMatches(state, payload.matches);
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
      mergeMatches(state, payload.matches);
    },
    setTatami(state, payload) {
      if (payload == null) {
        state.tatami = null;
        return;
      }

      state.tatami = payload.subscribedTatami;
    },
    setTatamiState(state, tatamiState) {
      state.tatamiState = tatamiState;
    },
  },
  actions: {
    connect({ commit, state }) {
      commit('setConnectionState', connection_state.CONNECTING);

      const connection = new WebSocket(process.env.VUE_APP_BACKEND_URL);

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
          commit('setTournaments', message);
        }
        else if (message.type == 'tournamentListingFail') {
          commit('setTournamentsState', loading_state.NOT_LOADED);
          commit('setTournaments', null);
        }
        else if (message.type == 'tournamentSubscription') {
          commit('setTournamentState', loading_state.LOADED);
          commit('setTournament', message);
        }
        else if (message.type == 'tournamentSubscriptionFail') {
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
        else if (message.type == 'tatamiSubscription') {
          commit('setTatamiState', loading_state.LOADED);
          commit('setTatami', message);
        }
        else if (message.type == 'tatamiSubscriptionFail') {
          commit('setTatamiState', loading_state.NOT_LOADED);
          commit('setTatami', null);
        }
        else if (message.type == 'tournamentChanges') {
          commit('changeTournament', message);
        }
        else {
          console.log("Unexpected message type received", message);

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
    subscribeTatami({ commit, state }, webName) {
      commit('setTatamiState', loading_state.LOADING);
      delayedSend(state.connection, 'subscribeTatami ' + webName)
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
    },
    playerMatches(state)  {
      var matches = [];
      if (state.player != null) {
        for (const combinedId of state.player.matches) {
          const match = state.matches.get(mapId(combinedId));
          matches.push(match);
        }
      }

      return matches.sort(playerMatchesComparator);
    },
    playerCategories(state)  {
      var categories = [];
      if (state.player != null) {
        for (const id of state.player.categories) {
          const category = state.categories.get(id);
          categories.push(category);
        }
      }

      return categories;
    },
    categoryMatches(state)  {
      var matches = [];
      if (state.category != null) {
        for (const combinedId of state.category.matches) {
          const match = state.matches.get(mapId(combinedId));
          matches.push(match);
        }
      }

      return matches;
    },
    categoryPlayers(state)  {
      var players = [];
      if (state.category != null) {
        for (const playerId of state.category.players) {
          const player = state.players.get(playerId);
          players.push(player);
        }
      }

      return players;
    },
    categoryResults(state) {
      var results = [];

      if (state.category != null && state.category.results != null) {
        for (const row of state.category.results) {
          const player = state.players.get(row.player);
          results.push({ ... player, pos: row.pos });
        }
      }

      return results;
    },
    getPlayer: (state) => (id) => {
      return state.players.get(id);
    },
    getCategory: (state) => (id) => {
      return state.categories.get(id);
    },
    tatamiBlocks(state) {
      if (state.tatami == null)
        return [];

      var res = [];
      for (const concurrentGroup of state.tatami.blocks) {
        var mappedConcurrentGroup = [];
        for (const sequentialGroup of concurrentGroup) {
          var mappedSequentialGroup = [];
          for (const block of sequentialGroup) {
            const category = state.categories.get(block.categoryId);
            mappedSequentialGroup.push({id: category.id, name: category.name, type: block.type, status: block.status});
          }

          mappedConcurrentGroup.push(mappedSequentialGroup);
        }

        res.push(mappedConcurrentGroup);
      }

      return res;
    },
  },
  modules: {
  },
})
