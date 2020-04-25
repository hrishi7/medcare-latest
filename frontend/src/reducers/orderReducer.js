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
    case "UPDATE_SELLER_ORDER":
      let sellOrders = state.sellerOrders;
      sellOrders.map((ord) => {
        if (ord._id == action.payload._id) {
          ord.status = action.payload.status;
        }
      });
      return {
        ...state,
        sellerOrders: sellOrders,
      };
    case "ADD_NEW_SELLER_ORDER":
      return {
        ...state,
        sellerOrders: [action.payload, ...state.sellerOrders],
      };
    default:
      return state;
  }
}
