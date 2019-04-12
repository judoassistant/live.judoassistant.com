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
    state.connecting = false;
  },
  subscribeTournament(state, message) {
    console.log("Subscribed tournament");

    state.tournamentLoading = false;
    state.tournament = message.tournament;

    state.categories = new Map();
    for (const category of message.categories)
      state.categories.set(category.id, category);

    state.players = new Map();
    for (const player of message.players)
      state.players.set(player.id, player);

    state.matches = new Map();
    for (const match of message.matches)
      state.matches.set(match.combinedId.matchId, match);

    state.subscribedCategory = message.subscribedCategory;
    state.subscribedPlayer = message.subscribedPlayer;
  },
  subscribePlayer(state, message) {
    console.log("Subscribe player", message);
    state.subscribedPlayerLoading = false;
    state.subscribedPlayer = message.subscribedPlayer;
    state.matches = new Map();
    for (const match of message.matches)
      state.matches.set(match.combinedId.matchId, match);
  },
  subscribeCategory(state, message) {
    console.log("Subscribe category", message);

    state.subscribedCategoryLoading = false;
    state.subscribedCategory = message.subscribedCategory;
    state.matches = new Map();
    for (const match of message.matches)
      state.matches.set(match.combinedId.matchId, match);
  },
  changeTournament(state, message) {
    // TODO: Implement
    console.log("Change tournament data", message);
  },
}

export const actions = {
  subscribeCategory({ commit }, id) {
    console.log("Subscribing category", id);
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

