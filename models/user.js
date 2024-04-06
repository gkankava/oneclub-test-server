const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  expenses: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      company_name: String,
      date: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        required: false,
      },
    },
  ],
});

var initialCategories = [
  new mongoose.Types.ObjectId("660ae4b402c8bf00125e2caa"),
  new mongoose.Types.ObjectId("660ae4f8ce8f280012f37381"),
  new mongoose.Types.ObjectId("660ae50ace8f280012f37382"),
  new mongoose.Types.ObjectId("660aecf43b99be27db32f2b6"),
  new mongoose.Types.ObjectId("660aed083b99be27db32f2b8"),
  new mongoose.Types.ObjectId("661135273b99be27db32f2bf"),
  new mongoose.Types.ObjectId("661135be3b99be27db32f2c9"),
  new mongoose.Types.ObjectId("6611360c3b99be27db32f2cd"),
  new mongoose.Types.ObjectId("661136233b99be27db32f2d0"),
  new mongoose.Types.ObjectId("6611362f3b99be27db32f2d2"),
  new mongoose.Types.ObjectId("6611484c3b99be27db32f30e"),
  new mongoose.Types.ObjectId("661152f3579c860012967ddb"),
  new mongoose.Types.ObjectId("6611548b9794f30012a9037e"),
  new mongoose.Types.ObjectId("661154a0ba1b550012f38ce5"),
  new mongoose.Types.ObjectId("66115bf5c2cd720012da424f"),
  new mongoose.Types.ObjectId("66115c1bba1b550012f38ce7"),
  new mongoose.Types.ObjectId("66115c36c2cd720012da4250"),
  new mongoose.Types.ObjectId("66115c3dd98ba00012c94e05"),
  new mongoose.Types.ObjectId("66115c4e9794f30012a90381"),
  new mongoose.Types.ObjectId("66115c61ce260c0012d53ee9"),
];

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.categories = initialCategories;
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candPassword, next) {
  try {
    let isMatch = await bcrypt.compare(candPassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
