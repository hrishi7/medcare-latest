const Order = require("../models/Order");
const SellerOrder = require("../models/SellerOrder");
const { ObjectID } = require("mongodb");

exports.getOrders = async (req, res) => {
  // console.log(req.user);
  /**checking the indivisual item status and if all item status is done then only change ovarall status to packaging is done */
  const { userEmail } = req.params;
  let orders = await Order.find({ userEmail });
  res.status(200).json(orders);
};

exports.getSellerOrders = async (req, res) => {
  const { role, _id } = req.user;
  if (role !== "seller") {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  let sellerOrders = await SellerOrder.find({ sellerId: _id }).sort({
    createdAt: -1,
  });
  res.status(200).json(sellerOrders);
};

exports.updateItemStatus = async (req, res) => {
  const { orderId, itemId } = req.params;

  const { status } = req.body;

  const updateStatus = {
    status: status,
  };
  let updatedSellerOrder = await SellerOrder.findOneAndUpdate(
    { medicineId: itemId },
    updateStatus,
    {
      new: true,
      runValidators: true,
    }
  );

  let order = await Order.findOne({ _id: orderId });

  let newItems = [];
  order.items.forEach((element) => {
    if (ObjectID(element.medicineId) == itemId) {
      element.status = status;
    }
    newItems.push(element);
  });

  await Order.findOneAndUpdate(
    { _id: orderId },
    { items: newItems },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedSellerOrder);
};
