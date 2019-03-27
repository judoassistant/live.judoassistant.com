export const state = () => ({
  counter: 0,
  loading: false,
  players: [
    { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 6, 'first_name': 'Jesse', 'last_name': 'Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 7, 'first_name': 'John', 'last_name': 'Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 8, 'first_name': 'Tina', 'last_name': 'Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 9, 'first_name': 'Clarence', 'last_name': 'Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 10, 'first_name': 'Anne', 'last_name': 'Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 11, 'first_name': 'Jesse', 'last_name': 'Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 12, 'first_name': 'John', 'last_name': 'Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 13, 'first_name': 'Tina', 'last_name': 'Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 14, 'first_name': 'Clarence', 'last_name': 'Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 15, 'first_name': 'Anne', 'last_name': 'Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 16, 'first_name': 'Jesse', 'last_name': 'Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 17, 'first_name': 'John', 'last_name': 'Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 18, 'first_name': 'Tina', 'last_name': 'Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 19, 'first_name': 'Clarence', 'last_name': 'Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 20, 'first_name': 'Anne', 'last_name': 'Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
  ],
  categories: [
    { 'id': 1, 'name': 'Drenge A -45', 'state': 'finished', 'playerCount': 4},
    { 'id': 2, 'name': 'Drenge A -50', 'state': 'not_started', 'playerCount': 7},
    { 'id': 3, 'name': 'Drenge A -55', 'state': 'not_started', 'playerCount': 3},
    { 'id': 4, 'name': 'Drenge A -66', 'state': 'in_progress', 'playerCount': 5},
    { 'id': 5, 'name': 'Drenge A -81', 'state': 'in_progress', 'playerCount': 6},
    { 'id': 6, 'name': 'Piger A -48', 'state': 'finished', 'playerCount': 3},
    { 'id': 7, 'name': 'Piger A -52', 'state': 'not_started', 'playerCount': 5},
    { 'id': 8, 'name': 'Piger A -57', 'state': 'not_started', 'playerCount': 6},
    { 'id': 9, 'name': 'Piger B -48', 'state': 'in_progress', 'playerCount': 5},
    { 'id': 10, 'name': 'Piger C -35', 'state': 'in_progress', 'playerCount': 2},
  ],
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
  selectCategory ({ commit }, id) {
    console.log("Selected category", id);
  }
}
