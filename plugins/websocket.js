export default ({ store }, inject) => {
  inject('selectPlayer', (id) => console.log("Selected player", id))
  inject('selectCategory', (id) => console.log("Selected category", id))
  store.commit("increment");
  console.log("Test", store.state.counter);
}

