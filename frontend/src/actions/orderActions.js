export const getOrdersAction = (orders) => ({
  type: "GET_ORDERS",
  payload: orders,
});

export const getSellerOrdersAction = (sellerOrders) => ({
  type: "SELLER_ORDERS",
  payload: sellerOrders,
});
