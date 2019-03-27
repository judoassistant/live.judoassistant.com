export const state = () => ({
  counter: 0,
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
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
