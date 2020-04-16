const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  const { userEmail } = req.params;
  let orders = await Order.find({ userEmail });
  res.status(200).json(orders);
};
