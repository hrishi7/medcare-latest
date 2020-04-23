const mongoose = require("mongoose");
const SellerOrderSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.ObjectId, ref: "Order" },
  medicineId: { type: mongoose.Schema.ObjectId, ref: "Medicine" },
  medicineName: String,
  quantity: Number,
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["recieved", "packed", "handedover"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SellerOrder", SellerOrderSchema);
