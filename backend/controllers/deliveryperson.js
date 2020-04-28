const Medicine = require("../models/Medicine");
const cloudinary = require("cloudinary").v2;
const { ObjectID } = require("mongodb");

//@desc     Get status of delivery person
//@route    Get /api/v1/deliveryperson
//@access   Public
exports.getStatus = async (req, res, next) => {
  let user = await User.findOne({ _id: req.user._id });
  res.status(200).json(user);
};

//@desc     Update delivery person current realtime location
//@route    Put /api/v1/deliveryperson/
//@access   Private
exports.updateRealtimeLocation = async (req, res, next) => {
  const { currentLocation } = req.body;
  let user = await User.findOneAndUpdate(
    { _id: ObjectID(req.user._id) },
    { $set: currentLocation },
    { new: true }
  );
  res.status(200).json({ success: true, data: user });
};
