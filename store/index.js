function playerMapper(player) {
  return { ...player, name : player.firstName + ' ' + player.lastName };
}

export const state = () => ({
  connected: false,
  connecting: true,

  tournamentLoading: false,
  tournament: null,
  players: null,
  categories: null,
  matches: null,

  subscribedCategoryLoading: false,
  subscribedCategory: null,
  subscribedPlayerLoading: false,
  subscribedPlayer: null,
})

export const mutations = {
  clearSubscribedCategory(state) {
    state.subscribedCategoryLoading = true;
    state.subscribedCategory = null;
    state.subscribedPlayer = null;
  },
  clearSubscribedPlayer(state) {
    state.subscribedPlayerLoading = true;
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
  },
  openConnection(state) {
    state.connected = true;
  },
  subscribeTournament(state, message) {
    state.connecting = false;
    state.tournamentLoading = false;
    state.tournament = message.tournament;
    state.categories = message.categories;
    state.players = message.players.map(playerMapper);
    state.matches = message.matches;
    state.subscribedCategory = message.subscribedCategory;
    state.subscribedPlayer = message.subscribedPlayer;
  },
  subscribePlayer(state, message) {
    state.subscribedPlayerLoading = false;
    state.subscribedPlayer = playerMapper(message.subscribedPlayer);
    state.matches = message.matches;
  },
  subscribeCategory(state, message) {
    state.subscribedCategoryLoading = false;
    state.subscribedCategory = message.subscribedCategory;
    state.matches = message.matches;
  },
  changeTournament(state, message) {
    // if ('tournament' in message)
    //   state.tournament = message.tournament;

    // // update categories
    // for (const categoryId of message.erasedCategories)
    //   state.categories.delete(categoryId);

    // for (const category of message.categories)
    //   state.categories.set(category.id, category);

    // if ('subscribedCategory' in message) {
    //   state.subscribedCategory = message.subscribedCategory;

    //   if (state.subscribedCategory != null) {
    //     const subscribedMatches = message.subscribedCategory.matches;
    //     state.subscribedCategory.matches = new Set();
    //     for (const combinedId of subscribedMatches)
    //       state.subscribedCategory.matches.add(combinedId.matchId);
    //   }
    // }

    // // update players
    // for (const playerId of message.erasedPlayers)
    //   state.players.delete(playerId);

    // for (const player of message.players)
    //   state.players.set(player.id, player);

    // if ('subscribedPlayer' in message) {
    //   state.subscribedPlayer = message.subscribedPlayer;
    // }

    // // update matches
    // for (const match of message.matches)
    //   state.matches.set(match.combinedId.matchId, match);

    // // remove orphan matches
    // for (const matchId of state.matches.keys()) {
    //   if (state.subscribedPlayer != null && state.subscribedPlayer.matches.has(matchId))
    //     continue;
    //   if (state.subscribedCategory != null && state.subscribedCategory.matches.has(matchId))
    //     continue;
    //   state.matches.delete(matchId);
    // }
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
  subscribeTournament({ commit, state }, id) {
    commit('clearTournament');

    // if (state.tournament != null && state.tournament.webName == id)
    //   return;
    this.$subscribeTournament(id);
  }
}

export const getters = {
  subscribedPlayerMatches(state, getters) {
    return [];
  },
  subscribedPlayerCategories(state, getters) {
    return [];
  },
  subscribedCategoryMatches(state, getters) {
    return [];
  },
  subscribedCategoryPlayers(state, getters) {
    return [];
  },
}

