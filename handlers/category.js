const db = require("../models");

exports.getAll = async function (req, res, next) {
  try {
    let userID = req.userId;
    const categoryList = await db.User.findById(userID, {
      categories: 1,
      _id: 0,
    }).populate("categories");
    return res.status(200).json(categoryList);
  } catch (error) {
    return next(error);
  }
};

exports.addCategory = async function (req, res, next) {
  try {
    let userID = req.userId;
    const user = await db.User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let category = await db.Category.create({
      name: req.body.name,
    });
    user.categories.push(category._id);
    await user.save();

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
