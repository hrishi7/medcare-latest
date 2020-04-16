const express = require("express");

const { register, login, logout } = require("../../../controllers/auth");
const {
  validationOnRegister,
  validationOnLogin,
  validationOnLogout
} = require("./validation");
const router = express.Router();

router.get("/test", (req, res, next) => res.json({ testing: "testing" }));

router.post("/register", validationOnRegister, register);

router.post("/login", validationOnLogin, login);

router.post("/logout", validationOnLogout, logout);

module.exports = router;
