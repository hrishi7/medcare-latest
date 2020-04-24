const Order = require("../models/Order");

exports.checkAndUpdateOrderStatus = async () => {
  console.log("called", new Date());
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
