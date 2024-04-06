const express = require("express");
const router = express.Router();
const { loginRequired } = require("../middleware/auth");
const { addCategory, getAll } = require("../handlers/category");
const {
  getExpenses,
  addNewExpense,
  updateExpense,
  deleteExpense,
} = require("../handlers/expense");

router.get("/categories", loginRequired, getAll);
router.post("/categories", loginRequired, addCategory);
router.get("/:category_id", loginRequired, getExpenses);
router.post("/:category_id", loginRequired, addNewExpense);
router.put("/:expense_id", loginRequired, updateExpense);
router.delete("/:expense_id", loginRequired, deleteExpense);

module.exports = router;
