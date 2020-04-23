export const getInitialProducts = (obj) => ({
  type: "GET_INITIAL_PRODUCTS",
  payload: obj,
});

export const addToCartAction = (obj) => ({
  type: "ADD_TO_CART",
  payload: obj,
});

export const removeFromCartAction = (id) => ({
  type: "REMOVE_FROM_CART",
  payload: id,
});

export const clearCartAction = () => ({
  type: "CLEAR_CART",
  payload: {},
});

export const increaseQuantity = (obj) => ({
  type: "INCREASE_QUANTITY",
  payload: obj,
});

export const decreaseQuantity = (obj) => ({
  type: "DECREASE_QUANTITY",
  payload: obj,
});
