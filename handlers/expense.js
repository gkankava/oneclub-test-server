const db = require("../models");

exports.getExpenses = async function (req, res, next) {
  try {
    const userID = req.userId;
    const category_id = req.params.category_id;

    const user = await db.User.findById(userID).populate("expenses.category");
    const expenses = user.expenses.filter((expense) => {
      return expense.category._id.toString() === category_id;
    });

    return res.status(200).json(expenses);
  } catch (error) {
    return next(error);
  }
};
exports.addNewExpense = async function (req, res, next) {
  try {
    const userID = req.userId;
    const { category_id } = req.params;
    const { company_name, date, price, rating } = req.body;
    const expense = {
      category: category_id,
      company_name,
      date,
      price,
      rating,
    };
    const user = await db.User.findByIdAndUpdate(
      userID,
      { $push: { expenses: expense } },
      { new: true }
    );
    return res.status(200).json(user.expenses);
  } catch (error) {
    return next(error);
  }
};
exports.updateExpense = async function (req, res, next) {
  try {
    const userID = req.userId;
    const { expense_id } = req.params;
    const { category_id, company_name, date, price, rating } = req.body;
    const user = await db.User.findById(userID);

    const expenseIndex = user.expenses.findIndex(
      (expense) => expense._id.toString() === expense_id
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update the expense at the found index
    user.expenses[expenseIndex].category = category_id;
    user.expenses[expenseIndex].company_name = company_name;
    user.expenses[expenseIndex].date = date;
    user.expenses[expenseIndex].price = price;
    user.expenses[expenseIndex].rating = rating;

    // Save the user document
    await user.save();

    return res.status(200).json(user.expenses);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
exports.deleteExpense = async function (req, res, next) {
  try {
    const userID = req.userId;
    const { expense_id } = req.params;

    const user = await db.User.findByIdAndUpdate(
      userID,
      { $pull: { expenses: { _id: expense_id } } },
      { new: true }
    );

    return res.status(200).json(user.expenses);
  } catch (error) {
    return next(error);
  }
};
