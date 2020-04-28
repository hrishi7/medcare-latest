const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "seller", "deliveryperson"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["online", "offline"],
  },
  currentLocation: {
    locLatitude: Number,
    locLongitude: Number,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
