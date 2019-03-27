export const state = () => ({
  counter: 0,
  loading: false,
  players: [
    { 'id': 1, 'name': 'Jesse Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 2, 'name': 'John Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 3, 'name': 'Tina Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 4, 'name': 'Clarence Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 5, 'name': 'Anne Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 6, 'name': 'Jesse Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 7, 'name': 'John Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 8, 'name': 'Tina Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 9, 'name': 'Clarence Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 10, 'name': 'Anne Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 11, 'name': 'Jesse Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 12, 'name': 'John Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 13, 'name': 'Tina Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 14, 'name': 'Clarence Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 15, 'name': 'Anne Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 16, 'name': 'Jesse Simmons', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 17, 'name': 'John Jacobs', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 18, 'name': 'Tina Gilbert', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 19, 'name': 'Clarence Flores', 'gender': 'Male', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
    { 'id': 20, 'name': 'Anne Lee', 'gender': 'Female', 'grade': '5. kyu', 'club': 'Aarhus Judo Klub'},
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
  detailedCategoryLoading: true,
  detailedCategory: {

  },
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
