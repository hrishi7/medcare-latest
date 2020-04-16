const mongoose = require("mongoose");
const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    enum: ["enteral", "parenteral", "other"],
    default: "enteral"
  },
  highlights: {
    type: [String],
    required: true
  },
  diseases: {
    type: [String],
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discountPercent: {
    type: Number,
    required: true
  },
  discountedPrice: Number,
  priceInOtherSites: [
    {
      site: String,
      price: Number
    }
  ],
  stock: [
    {
      seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      },
      stockAmount: Number,
      locLatitude: Number,
      locLongitude: Number
    }
  ],
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"]
  },
  photo: {
    type: String,
    default: "https://i.ibb.co/wSsNv22/noImage.png"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Medicine", MedicineSchema);
