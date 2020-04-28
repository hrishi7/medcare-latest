const Medicine = require("../models/Medicine");
const cloudinary = require("cloudinary").v2;
const { ObjectID } = require("mongodb");

//@desc     Get all medicines
//@route    Get /api/v1/medicines
//@access   Public
exports.getMedicines = async (req, res, next) => {
  console.log(req.user);
  // let medicines = await Medicine.find({ stock: { $exists: true, $ne: [] } });
  let medicines = await Medicine.find();
  res.status(200).json(medicines);
};

//@desc     Get single medicine
//@route    Get /api/v1/medicines/:id
//@access   Public
exports.getMedicine = async (req, res, next) => {
  const medicine = await Medicine.findById(req.params.medicineId);
  if (!medicine) {
    return res.status(400).json({
      message: `Medicine Not Found With The id of ${req.params.medicineId}`,
    });
  }
  res.status(200).json({ success: true, data: medicine });
};

//@desc     Create Medicine
//@route    Post /api/v1/medicines
//@access   Private
exports.createMedicine = async (req, res, next) => {
  const medicine = await Medicine.create(req.body);
  res.status(201).json({ success: true, data: medicine });
};

//@desc     Update medicine
//@route    Put /api/v1/medicines/:id
//@access   Private
exports.updateMedicine = async (req, res, next) => {
  let medicine = await Medicine.findOneAndUpdate(
    { _id: ObjectID(req.params.medicineId) },
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ success: true, data: medicine });
};

//@desc     Delete medicine
//@route    Delete /api/v1/medicines/:id
//@access   Private
exports.deleteMedicine = async (req, res, next) => {
  let medicine = await Medicine.findById(req.params.medicineId);
  medicine.remove();
  res.status(200).json({ success: true, data: {} });
};

//@desc     Update medicine
//@route    Put /api/v1/medicines/updateStock/
//@access   Private

//not working currently properly
// need to break from foreach loop as soon as update is done otherwise search for the end and add the row into array
exports.updateMedicineStock = async (req, res, next) => {
  //make sure user is seller or seller

  if (req.user.role === "seller") {
    let medicine = await Medicine.findOne({ name: req.body.medicine });

    if (medicine.stock.length <= 0) {
      //simple add the user with details
      medicine.stock.unshift({
        seller: ObjectID(req.user.id),
        stockAmount: req.body.stockAmount,
        locLatitude: req.body.locLatitude,
        locLongitude: req.body.locLongitude,
      });
      await medicine.save();
      res.status(200).json({ success: true, data: medicine });
    } else {
      medicine.stock.forEach(async (each, index) => {
        if (each.seller == req.user.id) {
          each.stockAmount = req.body.stockAmount;
          each.locLatitude = req.body.locLatitude;
          each.locLongitude = req.body.locLongitude;
          await medicine.save();
          return res.status(200).json({ success: true, data: medicine });
          // break;
        }
        if (index == medicine.stock.length - 1) {
          medicine.stock.unshift({
            seller: req.user.id,
            stockAmount: req.body.stockAmount,
            locLatitude: req.body.locLatitude,
            locLongitude: req.body.locLongitude,
          });
          await medicine.save();
          return res.status(200).json({ success: true, data: medicine });
        }
      });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.getStocks = async (req, res, next) => {
  // console.log(req.query);
  if (req.user.role === "seller") {
    let medicine = await Medicine.findOne({
      name: req.query.medicine,
    });
    medicine.stock.forEach(async (each, index) => {
      if (each.seller == req.user.id) {
        let stock = {
          medicine: req.query.medicine,
          info: each,
        };
        return res.status(200).json({ success: true, data: stock });
        // break;
      }
      if (index == medicine.stock.length - 1) {
        let stock = {
          medicine: req.query.medicine,
          info: {},
        };
        return res.status(200).json({ success: true, data: stock });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.uploadImage = async (req, res, next) => {
  cloudinary.uploader.upload(req.files.photo.tempFilePath, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Image Upload Failed try again" });
      console.log("upload failed", err);
    } else {
      res.status(200).json({ photoUrl: result.secure_url });
    }
  });
};
