const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getStatus,
  updateRealtimeLocation,
} = require("../../../controllers/deliveryperson");

//@desc     Get status
//@route    Get /api/v1/deliveryperson/getStatus
//@access   Private
router.get(
  "/getStatus",
  passport.authenticate("jwt", { session: false }),
  getStatus
);

/**
 * @desc Status Update deliveryperson realtime location
 * @route put /api/v1/deliveryperson/updateRealtimeLocation
 * @access Private
 */
router.put(
  "/updateRealtimeLocation",
  passport.authenticate("jwt", { session: false }),
  updateRealtimeLocation
);

module.exports = router;
