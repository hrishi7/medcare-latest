const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc     Register user
//@route    Post /api/v1/auth/register
//@access   Public
exports.register = async (req, res, next) => {
  let { name, email, mobile, password, role } = req.body;

  let salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  //Create user
  await User.create({
    name,
    email,
    mobile,
    password,
    role
  });
  res.status(201).json({ message: "Registration Successfull" });
};

//@desc     Login user
//@route    Post /api/v1/auth/login
//@access   Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  //check for user
  const user = await User.findOne({ email });
  //check if password matches
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).json({
      message: "Invalid Password"
    });
  } else {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }; // Create JWT Payload
    // Sign Token
    jwt.sign(
      payload,
      process.env.SECRETORKEY,
      { expiresIn: 3600 },
      (err, token) => {
        res.status(200).json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  }
};

//@desc     Logout the user / clear cookie
//@route    Get /api/v1/auth/logout
//@access   Private

exports.logout = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
};
