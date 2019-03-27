export const state = () => ({
  connected: false,
  connecting: true,

  tournamentLoading: false,
  tournament: null,
  players: null,
  categories: null,

  detailedCategoryLoading: false,
  detailedCategory: null,
  detailedPlayerLoading: false,
  detailedPlayer: null,
})

export const mutations = {
  clearDetailedCategory (state) {
    state.detailedCategoryLoading = true;
    state.detailedCategory = null;
  },
  clearDetailedPlayer (state) {
    state.detailedPlayerLoading = true;
    state.detailedPlayer = null;
  },
  clearTournament (state) {
    state.tournamentLoading = true;
    state.tournament = null;
  },
  closeConnection (state) {
    state.connected = false;
    state.connecting = false;
    state.tournamentLoading = false;
    state.detailedPlayerLoading = false;
    state.detailedCategoryLoading = false;
  },
  openConnection (state) {
    state.connected = true;
    state.connecting = false;
  },
}

export const actions = {
  selectCategory ({ commit }, id) {
    commit('clearDetailedCategory');
    this.$selectCategory(id);
  },
  selectPlayer ({ commit }, id) {
    commit('clearDetailedPlayer');
    this.$selectPlayer(id);
  },
  selectTournament ({ commit, state }, id) {
    commit('clearTournament');

    if (state.tournament != null && state.tournament.webName == id) {
      return;
    }
    this.$selectTournament(id);
  }
}
