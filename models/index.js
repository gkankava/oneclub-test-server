const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

module.exports.User = require("./user");
module.exports.Category = require("./category");
