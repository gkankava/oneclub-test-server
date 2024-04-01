const db = require("../models");

exports.getAll = async function (req, res, next) {
  try {
    let list = await db.Category.find();
    return res.status(200).json(list);
  } catch (error) {
    return next(error);
  }
};

exports.addCategory = async function (req, res, next) {
  try {
    let category = await db.Category.create({
      name: req.body.categoryName,
    });
    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};
