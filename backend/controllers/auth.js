const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");

//@desc     Register user
//@route    Post /api/v1/auth/register
//@access   Public
exports.register = async (req, res, next) => {
  let { name, email, mobile, password, role } = req.body;

  let newUser = {
    name,
    email,
    mobile,
    role,
  };

  /**for deliveryPerson case add status and currentLocation */
  if (role == "deliveryperson") {
    newUser.status = "offline";
    let currentLocation = {
      locLatitude: null,
      locLongitude: null,
    };
    newUser.currentLocation = currentLocation;
  }

  let salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  newUser.password = password;
  //Create user
  await User.create(newUser);
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
      message: "Invalid Password",
    });
  } else {
    if (user.role == "deliveryperson") {
      await User.findOneAndUpdate(
        { _id: ObjectID(user._id) },
        { $set: { status: "online" } },
        { new: true }
      );
    }
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }; // Create JWT Payload
    // Sign Token
    jwt.sign(
      payload,
      process.env.SECRETORKEY,
      { expiresIn: 3600 },
      (err, token) => {
        res.status(200).json({
          success: true,
          token: "Bearer " + token,
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
    data: {},
  });
};
