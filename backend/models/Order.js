const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  purpose: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  items: [{}],
  amount: {
    type: Number,
  },
  delivery: String,
  deliveryLocation: String,
  payment: {
    type: String,
    enum: ["pending", "completed", "failed"],
  },
  paymentMode: {
    type: String,
    enum: ["online", "offline"],
  },
  status: {
    type: String,
    enum: [
      "Ordered",
      "Received Order",
      "Packaging is done",
      "On The way",
      "Delivered",
    ],
  },
  deliveryPerson: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
