const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getOrders,
  updateItemStatus,
  getSellerOrders,
} = require("../../../controllers/orders");

//@desc     Get all medicines
//@route    Get /api/v1/orders
//@access   Private
router.get(
  "/:userEmail",
  passport.authenticate("jwt", { session: false }),
  getOrders
);

/**
 * @desc getting sellerorders
 * @route get /api/v1/orders/sellerorders/orders
 * @access Private
 */
router.get(
  "/sellerorders/orders",
  passport.authenticate("jwt", { session: false }),
  getSellerOrders
);

/**
 * @desc Status Update single seller order
 * @route put /api/v1/orders/updateItem/:orderId/:itemId
 * @access Private
 */
router.put(
  "/updateItem/:orderId/:itemId",
  passport.authenticate("jwt", { session: false }),
  updateItemStatus
);

module.exports = router;
