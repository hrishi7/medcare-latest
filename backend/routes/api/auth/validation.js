const User = require("../../../models/User");

exports.validationOnRegister = async (req, res, next) => {
  if (!isEmpty(req.body)) {
    /**check duplicate email */
    const { email } = req.body;
    let exist = await User.findOne({ email });
    if (!exist) {
      next();
    } else {
      res.status(400).json({ message: "This email is already exist!" });
    }
  } else {
    res.status(400).json({ message: "Please Provide correct details" });
  }
};

exports.validationOnLogin = async (req, res, next) => {
  if (!isEmptyLoginCred(req.body)) {
    next();
  } else {
    res.status(400).json({ message: "Please Provide correct credientials" });
  }
};

exports.validationOnLogout = async (req, res, next) => {
  if (!req.param.userId) {
    res.status(400).json({ message: "Invalid Credientials" });
  } else {
    next();
  }
};

const isEmpty = credientials => {
  if (!credientials) {
    return true;
  }
  if (
    !credientials.email ||
    !credientials.name ||
    !credientials.password ||
    !credientials.mobile ||
    !credientials.role
  ) {
    return true;
  }
  return false;
};

const isEmptyLoginCred = credientials => {
  if (!credientials) {
    return true;
  }
  if (!credientials.email || !credientials.password) {
    return true;
  }
  return false;
};
