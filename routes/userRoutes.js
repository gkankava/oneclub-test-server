const express = require("express");
const { getUserData } = require("../handlers/user");
const { loginRequired } = require("../middleware/auth");
const router = express.Router();

router.get("/", loginRequired, getUserData);

module.exports = router;
