export const getOrdersAction = (orders) => ({
  type: "GET_ORDERS",
  payload: orders,
});

export const getSellerOrdersAction = (sellerOrders) => ({
  type: "SELLER_ORDERS",
  payload: sellerOrders,
});

export const updateSellerOrderAction = (updatedSellerOrder) => ({
  type: "UPDATE_SELLER_ORDER",
  payload: updatedSellerOrder,
});

export const pushNewSellerOrdersAction = (newSellerOrder) => ({
  type: "ADD_NEW_SELLER_ORDER",
  payload: newSellerOrder,
});
