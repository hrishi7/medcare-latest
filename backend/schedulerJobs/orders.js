const Order = require("../models/Order");

exports.checkAndUpdateOrderStatus = async () => {
  let orders = await Order.find({ status: "Received Order" });

  let updateOrderStatus = [];
  orders.map(async (order) => {
    let isPresent = await checkAllItemStatusComplete(order.items);
    if (isPresent == true) {
      let updatePromise = await Order.findOneAndUpdate(
        { _id: order._id },
        { status: "Packaging is done" },
        {
          new: true,
          runValidators: true,
        }
      );
      /**search for all online Delivery persons
       * then compare distance between delivery currentLocation and deliveryLocation
       * select lowest distance and update Order with that delivery person _id and
       * then send socket.io notification to ManageOrder of deliveryperson
       * then search in the frontend
       * 1. search and restructure every order item with seller location name and medicine detail and delivery location
       */
      let deliveryPersons = await User.find({
        status: "online",
        role: "deliveryperson",
      });
      updateOrderStatus.push(updatePromise);
    }
  });
};

const checkAllItemStatusComplete = (items) => {
  let x = true;
  items.forEach((item) => {
    if (item.status != "handedover") {
      x = false;
    }
  });
  return x;
};
