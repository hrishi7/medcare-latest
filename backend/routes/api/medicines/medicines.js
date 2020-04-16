const express = require("express");
const passport = require("passport");

const {
  createMedicine,
  updateMedicine,
  getMedicines,
  getMedicine,
  deleteMedicine,
  updateMedicineStock,
  getStocks,
  uploadImage,
} = require("../../../controllers/medicines");

const {
  validationOnInsert,
  validateOnUpdate,
  validateOnDelete,
} = require("./validation");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationOnInsert,
  createMedicine
);

router.put(
  "/:medicineId",
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  updateMedicine
);

router.get("/", getMedicines);

router.get("/:medicineId", getMedicine);

router.get(
  "/getStocks/stocks",
  passport.authenticate("jwt", { session: false }),
  getStocks
);

router.delete(
  "/:medicineId",
  passport.authenticate("jwt", { session: false }),
  validateOnDelete,
  deleteMedicine
);

router.post(
  "/updateStock",
  passport.authenticate("jwt", { session: false }),
  updateMedicineStock
);

router.post(
  "/uploadImage",
  // passport.authenticate("jwt", { session: false }),
  uploadImage
);

module.exports = router;
