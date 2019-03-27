export default ({ store }) => {
  console.log("Test", store.state.counter);
  store.commit("increment");
  console.log("Test", store.state.counter);
}

