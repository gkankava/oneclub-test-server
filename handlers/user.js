const db = require("../models");

exports.getUserData = async function (req, res, next) {
  try {
    let userID = req.userId;
    const user = await db.User.findById(userID);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
