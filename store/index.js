function mapRank(rank) {
  switch (rank) {
    case "KYU_6":
      return "6th kyu";
    case "KYU_5":
      return "5th kyu";
    case "KYU_4":
      return "4th kyu";
    case "KYU_3":
      return "3rd kyu";
    case "KYU_2":
      return "2nd kyu";
    case "KYU_1":
      return "1st kyu";
    case "DAN_1":
      return "1st dan";
    case "DAN_2":
      return "2nd dan";
    case "DAN_3":
      return "3rd dan";
    case "DAN_4":
      return "4th dan";
    case "DAN_5":
      return "5th dan";
    case "DAN_6":
      return "6th dan";
    case "DAN_7":
      return "7th dan";
    case "DAN_8":
      return "8th dan";
    case "DAN_9":
      return "9th dan";
    case "DAN_10":
      return "10th dan";
    default:
      return "";
  }
}

function mapCountry(country) {
  switch (country) {
    case "DENMARK":
      return "Denmark";
    case "FRANCE":
      return "France";
    default:
      return "";
  }
}

function mapSex(sex) {
  switch (sex) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    default:
      return "";
  }
}

function mapPlayer(player) {
  if (player == null)
    return null;
  return { ...player, name : player.firstName + ' ' + player.lastName, country: mapCountry(player.country), rank: mapRank(player.rank), sex: mapSex(player.sex) };
}

function mapTournament(tournament) {
  if (tournament == null)
    return null;
  return { name: tournament.name, webName : tournament.webName, location: tournament.location, date: new Date(tournament.date) };
}

function mapTournamentListing(tournament) {
  return { name: tournament.name, webName : tournament.webName, location: tournament.location, date: new Date(tournament.date) };
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

  tournaments: null,
  tournamentsLoading: false,

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
  clearTournaments(state) {
    state.tournamentsLoading = true;
    state.tournaments = null;
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
    state.connecting = false;
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
    state.tournament = mapTournament(message.tournament);
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
  listTournaments(state, message) {
    state.tournaments = message.tournaments.map(mapTournamentListing);
    state.tournamentsLoading = false;
  },
  changeTournament(state, message) {
    if ('tournament' in message)
      state.tournament = mapTournament(message.tournament);

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
    for (var i = 0; i < state.tatamis.length; ++i) {
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
  },
  listTournaments({ commit, state}) {
    commit('clearTournaments');

    this.$listTournaments();
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

    var combinedIds = new Set(state.subscribedCategory.matches);
    for (const combinedId of state.subscribedCategory.matches)
      combinedIds.add(mapId(combinedId));

    const orderPred = (a, b) => (a.position - b.position);
    return state.matches.filter(match => combinedIds.has(mapId(match.combinedId))).sort(orderPred);
  },
  subscribedCategoryResults(state, getters) {
    if (state.subscribedCategory == null) return null;
    if (state.subscribedCategory.results == null) return null;

    var playerIds = new Map();
    for (const row of state.subscribedCategory.results)
      playerIds.set(row.player, row.pos);

    function orderPred(a, b) {
      // Sort by pos. null considered infinity
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

    var combinedIds = new Set(state.subscribedPlayer.matches);
    for (const combinedId of state.subscribedPlayer.matches)
      combinedIds.add(mapId(combinedId));

    function orderPred(a,b) {
      // Sort by categoryId then position
      if (a.combinedId.categoryId != b.combinedId.categoryId)
        return a.combinedId.categoryId - b.combinedId.categoryId;
      return a.position - b.position;
    }

    return state.matches.filter(match => combinedIds.has(mapId(match.combinedId))).sort(orderPred);
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

