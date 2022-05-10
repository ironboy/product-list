export function add(cartContents, productToAdd, quantityToAdd = 1) {
  let row = cartContents
    .find(row => row.product.id === productToAdd.id);
  if (row) {
    row.quantity += quantityToAdd
  }
  else {
    cartContents.push({
      product: productToAdd,
      quantity: quantityToAdd
    })
  }
}
