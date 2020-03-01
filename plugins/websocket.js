function socketDelayedSend(socket, message) {
  if (socket.readyState == 1) {
    socket.send(message);
    return;
  }

  socket.addEventListener('open', (event) => {
    socket.send(message);
  });
}

export default ({ store }, inject) => {
  const socket = new WebSocket(process.env.webSocketUrl);
  inject('subscribeCategory', (id) => {
    socketDelayedSend(socket, 'subscribeCategory ' + id);
  });
  inject('subscribePlayer', (id) => {
    socketDelayedSend(socket, 'subscribePlayer ' + id);
  });
  inject('subscribeTournament', (id) => {
    socketDelayedSend(socket, 'subscribeTournament ' + id);
  });
  inject('subscribeTatami', (id) => {
    socketDelayedSend(socket, 'subscribeTatami ' + id);
  });

  // Connection opened
  socket.addEventListener('open', function (event) {
    store.commit('openConnection');
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    const message = JSON.parse(event.data);

    if (message.messageType == "tournamentSubscription")
      store.commit('subscribeTournament', message);
    else if (message.messageType == "tournamentChanges")
      store.commit('changeTournament', message);
    else if (message.messageType == "playerSubscription")
      store.commit('subscribePlayer', message);
    else if (message.messageType == "categorySubscription")
      store.commit('subscribeCategory', message);
    else if (message.messageType == "tatamiSubscription")
      store.commit('subscribeTatami', message);
    else if (message.messageType == "tournamentSubscriptionFail")
      store.commit('failSubscribeTournament', message);
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

