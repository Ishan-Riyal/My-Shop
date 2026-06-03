export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * (item.qty || 1)) / 100,
    0,
  );
  state.itemsPrice = addDecimals(itemsPrice);

  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  state.shippingPrice = addDecimals(shippingPrice);

  const taxPrice = 0.18 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  state.totalPrice = addDecimals(itemsPrice + shippingPrice + taxPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
