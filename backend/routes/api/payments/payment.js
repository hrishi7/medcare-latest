const express = require("express");
const router = express.Router();

const passport = require("passport");

const { payment, paymentCallback } = require("../../../controllers/payments");

/**
 * @route GET /api/v1/payment/pay
 * @desc post payment route
 * @access private
 */

router.post("/pay", payment);

/**
 * @route GET /api/v1/payment/callback/
 * @desc Call back url for instamojo
 * @access public
 */

router.get(
  "/callback/",

  paymentCallback
);

module.exports = router;
