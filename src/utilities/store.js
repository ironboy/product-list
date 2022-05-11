// A small wrapper for localStorage
let store;
try { store = JSON.parse(localStorage.store); }
catch (e) { store = {} }
store.save = function () {
  localStorage.store = JSON.stringify(this);
};

export default store;