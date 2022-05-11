// Import a small wrapper fror localStorage
import store from './store';

export function get() {
  return store.cartContents || [];
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
  store.save();
}
