const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      phone: req.body.phone,
    });
    let { id, phone } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          phone,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({ token, user });
    } else {
      return next({
        status: 400,
        message: "Invalid phone/Password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid phone/Password",
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, phone } = user;
    let token = jwt.sign(
      {
        id,
        phone,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      phone,
      token,
    });
  } catch (error) {
    console.log(error);
    return next({
      status: 400,
      message: error.message,
    });
  }
};
