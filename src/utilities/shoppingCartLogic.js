// Import a small wrapper fror localStorage
import store from './store';

let stateObject, stateProperty;

export function save() {
  // set localStorage from state
  store.cartContents = stateObject[stateProperty];
  // save to local storage
  store.save();
}

export function init(stateObj, stateProp) {
  // remember the state object and state property so that
  // we can change the state each time we save the cart
  stateObject = stateObj;
  stateProperty = stateProp;
  // set state from localStorage
  stateObj[stateProperty] = store.cartContents || [];
}

export function add(productToAdd, quantityToAdd = 1) {

  store.cartContents = store.cartContents || [];

  let row = store.cartContents
    .find(row => row.product.id === productToAdd.id);
  if (row) {
    row.quantity += quantityToAdd
  }
  else {
    store.cartContents.push({
      product: productToAdd,
      quantity: quantityToAdd
    });
  }
  save();
}

export function empty() {
  stateObject[stateProperty] = [];
  save();
}