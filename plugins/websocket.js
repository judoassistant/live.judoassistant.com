export default ({ store }, inject) => {
  const socket = new WebSocket('ws://localhost:9000');
  inject('selectCategory', (id) => console.log("Selecting category from plugin", id));
  inject('selectPlayer', (id) => console.log("Selecting player from plugin", id));

  // Connection opened
  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });

  socket.addEventListener('error', function (event) {
    store.commit('closeConnection');
  });

  socket.addEventListener('close', function (event) {
    store.commit('closeConnection');
  });

  // store.commit("increment");
  // console.log("Loading", store.state.closed);
}

// }

