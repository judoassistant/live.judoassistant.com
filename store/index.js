function mapPlayer(player) {
  return { ...player, name : player.firstName + ' ' + player.lastName };
}

function mapId(combinedId) {
  return String(combinedId.categoryId) + "_" + String(combinedId.matchId);
}

function mergeMatches(state, matches) {
    const changedMatches = new Map(matches.map(match => [mapId(match.combinedId), match]));
    const currentMatches = new Map(state.matches.map(match => [mapId(match.combinedId), match]));

    const relevantMatches = new Set(); // ids of all matches to keep
    if (state.subscribedPlayer != null) {
      for (const matchId of state.subscribedPlayer.matches)
        relevantMatches.add(mapId(matchId));
    }

    if (state.subscribedCategory != null) {
      for (const matchId of state.subscribedCategory.matches)
        relevantMatches.add(mapId(matchId));
    }

    for (const tatami of state.tatamis) {
      for (const matchId of tatami.matches)
        relevantMatches.add(mapId(matchId));
    }

    var res = []
    for (const matchId of relevantMatches) {
      if (changedMatches.has(matchId)) {
        res.push(changedMatches.get(matchId));
        continue;
      }

      if (currentMatches.has(matchId)) {
        res.push(currentMatches.get(matchId));
        continue;
      }
    }

  return res;
}

export const state = () => ({
  connected: false,
  connecting: true,

  tournamentLoading: false,
  tournament: null,
  players: null,
  categories: null,
  matches: null,
  tatamis: null,

  subscribedCategoryLoading: false,
  subscribedCategory: null,
  subscribedPlayerLoading: false,
  subscribedPlayer: null,
  subscribedTatamiLoading: false,
  subscribedTatami: null,
})

export const mutations = {
  clearSubscribedCategory(state) {
    state.subscribedCategoryLoading = true;
    state.subscribedCategory = null;
    state.subscribedPlayer = null;
    state.subscribedTatami = null;
  },
  clearSubscribedPlayer(state) {
    state.subscribedPlayerLoading = true;
    state.subscribedPlayer = null;
    state.subscribedCategory = null;
    state.subscribedTatami = null;
  },
  clearSubscribedTatami(state) {
    state.subscribedTatamiLoading = true;
    state.subscribedTatami = null;
    state.subscribedPlayer = null;
    state.subscribedCategory = null;
  },
  clearTournament(state) {
    state.tournamentLoading = true;
    state.tournament = null;
  },
  closeConnection(state) {
    state.connected = false;
    state.connecting = false;
    state.tournamentLoading = false;
    state.subscribedPlayerLoading = false;
    state.subscribedCategoryLoading = false;
    state.subscribedTatamiLoading = false;
  },
  openConnection(state) {
    state.connected = true;
  },
  failSubscribeTournament(state, message) {
    state.connecting = false;
    state.tournamentLoading = false;
    state.tournament = null;
    state.categories = null;
    state.players = null;
    state.matches = null;
    state.subscribedCategory = null;
    state.subscribedPlayer = null;
    state.subscribedTatami = null;
    state.tatamis = null;
  },
  subscribeTournament(state, message) {
    state.connecting = false;
    state.tournamentLoading = false;
    state.tournament = message.tournament;
    state.categories = message.categories;
    state.players = message.players.map(mapPlayer);
    state.matches = message.matches;
    state.subscribedCategory = message.subscribedCategory;
    state.subscribedPlayer = mapPlayer(message.subscribedPlayer);
    state.subscribedTatami = message.subscribedTatami;
    state.tatamis = message.tatamis;
  },
  subscribePlayer(state, message) {
    state.subscribedPlayerLoading = false;
    state.subscribedPlayer = mapPlayer(message.subscribedPlayer);
    state.matches = mergeMatches(state, message.matches);
  },
  subscribeCategory(state, message) {
    state.subscribedCategoryLoading = false;
    state.subscribedCategory = message.subscribedCategory;
    state.matches = mergeMatches(state, message.matches);
  },
  subscribeTatami(state, message) {
    state.subscribedTatamiLoading = false;
    state.subscribedTatami = message.subscribedTatami;
  },
  changeTournament(state, message) {
    if ('tournament' in message)
      state.tournament = message.tournament;

    // update categories
    const erasedCategories = new Set(message.erasedCategories);
    const changedCategories = new Map(message.categories.map(category => [category.id, category]));

    var categories = [];
    for (const category of state.categories) {
      if (erasedCategories.has(category.id))
        continue;

      if (changedCategories.has(category.id)) {
        categories.push(changedCategories.get(category.id));
        changedCategories.delete(category.id);
        continue;
      }

      categories.push(category);
    }

    for (const category of changedCategories.values())
      categories.push(category);

    state.categories = categories;

    if ('subscribedCategory' in message)
      state.subscribedCategory = message.subscribedCategory;

    // update players
    const erasedPlayers = new Set(message.erasedPlayers);
    const changedPlayers = new Map(message.players.map(player => [player.id, player]));

    var players = [];
    for (const player of state.players) {
      if (erasedPlayers.has(player.id))
        continue;

      if (changedPlayers.has(player.id)) {
        players.push(mapPlayer(changedPlayers.get(player.id)));
        changedPlayers.delete(player.id);
        continue;
      }

      players.push(player);
    }

    for (const player of changedPlayers.values())
      players.push(mapPlayer(player));

    state.players = players;

    if ('subscribedPlayer' in message)
      state.subscribedPlayer = mapPlayer(message.subscribedPlayer);

    if ('subscribedTatami' in message)
      state.subscribedTatami = message.subscribedTatami;

    // update tatamis
    var tatamis = [];
    var j = 0;
    for (var i = 0; i < state.tournament.tatamiCount; ++i) {
      if (j < message.tatamis.length && message.tatamis[j].index == i) {
        tatamis.push(message.tatamis[j]);
        ++j;
      } else {
        tatamis.push(state.tatamis[i]);
      }
    }
    state.tatamis = tatamis;

    // update matches
    state.matches = mergeMatches(state, message.matches);
  },
}

export const actions = {
  subscribeCategory({ commit }, id) {
    commit('clearSubscribedCategory');
    this.$subscribeCategory(id);
  },
  subscribePlayer({ commit }, id) {
    commit('clearSubscribedPlayer');

    this.$subscribePlayer(id);
  },
  subscribeTatami({ commit }, id) {
    commit('clearSubscribedTatami');

    this.$subscribeTatami(id);
  },
  subscribeTournament({ commit, state }, id) {
    commit('clearTournament');

    // if (state.tournament != null && state.tournament.webName == id)
    //   return;
    this.$subscribeTournament(id);
  }
}

export const getters = {
  subscribedPlayerMatches(state, getters) {
    if (state.subscribedPlayer == null) return [];
    return [];
  },
  subscribedPlayerCategories(state, getters) {
    if (state.subscribedPlayer == null) return [];

    const categories = new Set(state.subscribedPlayer.categories);
    return state.categories.filter(category => categories.has(category.id));
  },
  subscribedCategoryMatches(state, getters) {
    if (state.subscribedCategory == null) return [];

    var matchIds = new Map();
    for (const [i, combinedId] of state.subscribedCategory.matches.entries())
      matchIds.set(mapId(combinedId), i);

    const orderPred = (a, b) => (matchIds.get(mapId(a.combinedId)) - matchIds.get(mapId(b.combinedId)));
    return state.matches.filter(match => matchIds.has(mapId(match.combinedId))).sort(orderPred);
  },
  subscribedCategoryResults(state, getters) {
    if (state.subscribedCategory == null) return null;
    if (state.subscribedCategory.results == null) return null;

    var playerIds = new Map();
    for (const row of state.subscribedCategory.results)
      playerIds.set(row.player, row.pos);

    function orderPred(a, b) {
      if (a.pos == null && b.pos == null)
        return 0;
      if (a.pos == null)
        return 1;
      if (b.pos == null)
        return -1;
      return a.pos - b.pos;
    }

    return state.players.filter(player => playerIds.has(player.id)).map(player => { return {...player, pos: playerIds.get(player.id) }}).sort(orderPred);
  },
  subscribedPlayerMatches(state, getters) {
    if (state.subscribedPlayer == null) return [];

    var matchIds = new Map();
    for (const [i, combinedId] of state.subscribedPlayer.matches.entries())
      matchIds.set(mapId(combinedId), i);

    const orderPred = (a, b) => (matchIds.get(mapId(a.combinedId)) - matchIds.get(mapId(b.combinedId)));
    return state.matches.filter(match => matchIds.has(mapId(match.combinedId))).sort(orderPred);
  },
  subscribedCategoryPlayers(state, getters) {
    if (state.subscribedCategory == null) return [];

    const players = new Set(state.subscribedCategory.players);
    return state.players.filter(player => players.has(player.id));
  },
  getPlayerById: (state) => (id) => {
    return state.players.find(player => player.id == id);
  },
  getCategoryById: (state) => (id) => {
    return state.categories.find(category => category.id == id);
  },
  tatamiMatches(state, getters) {
    var matches = [];
    for (const tatami of state.tatamis) {
      var matchIds = new Map();
      for (const [i, combinedId] of tatami.matches.entries())
        matchIds.set(mapId(combinedId), i);

      const orderPred = (a, b) => (matchIds.get(mapId(a.combinedId)) - matchIds.get(mapId(b.combinedId)));
      matches.push(state.matches.filter(match => matchIds.has(mapId(match.combinedId))).sort(orderPred));
    }
    return matches;
  },
}

