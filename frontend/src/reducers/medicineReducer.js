const initiaState = {
  products: [],
  cartItems: [],
};

export default function (state = initiaState, action) {
  switch (action.type) {
    case "GET_INITIAL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "INCREASE_QUANTITY":
      let index = action.payload.j;
      let items = [...state.cartItems];
      items[index].quantity++;
      return {
        ...state,
        cartItems: items,
      };
    case "DECREASE_QUANTITY":
      let index2 = action.payload.j;
      let items2 = [...state.cartItems];
      if (items2[index2].quantity > 1) items2[index2].quantity--;
      return {
        ...state,
        cartItems: items2,
      };
    default:
      return state;
  }
}
