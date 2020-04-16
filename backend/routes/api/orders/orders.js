const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getOrders } = require("../../../controllers/orders");

//@desc     Get all medicines
//@route    Get /api/v1/orders
//@access   Private
router.get(
  "/:userEmail",
  passport.authenticate("jwt", { session: false }),
  getOrders
);

module.exports = router;
