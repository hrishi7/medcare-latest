const initiaState = {
  orders: [],
  sellerOrders: [],
};

export default function (state = initiaState, action) {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "SELLER_ORDERS":
      return {
        ...state,
        sellerOrders: action.payload,
      };
    default:
      return state;
  }
}
