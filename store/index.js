export const state = () => ({
  connected: false,
  connecting: false,

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
  closeConnection (state) {
    state.connected = false;
    state.detailedPlayerLoading = false;
    state.detailedCategoryLoading = false;
    state.loading = false;
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
  }
}
