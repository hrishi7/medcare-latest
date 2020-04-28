const express = require("express");
const router = express.Router();

/**getting routes */
const auth = require("./auth/auth");
const medicines = require("./medicines/medicines");
const payment = require("./payments/payment");
const orders = require("./orders/orders");
const deliveryperson = require("./deliveryperson/deliveryperson");

/**setting middlewares to specific routes */
router.use("/auth", auth);
router.use("/medicines", medicines);
router.use("/payment", payment);
router.use("/orders", orders);
router.use("/deliveryperson", deliveryperson);

module.exports = router;
