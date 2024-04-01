const express = require("express");
const router = express.Router();
const { getAll, addCategory } = require("../handlers/category");

router.get("/categories", getAll);
router.post("/categories", addCategory);

module.exports = router;
