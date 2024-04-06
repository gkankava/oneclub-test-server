require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { loginRequired } = require("./middleware/auth");

const bodyparser = require("body-parser");
const errorHandler = require("./handlers/error");

const app = express();
const server = http.createServer(app);
const db = require("./models");
const PORT = process.env.PORT;

const morgan = require("morgan");

app.use(cors());
app.use(bodyparser.json());
app.use(morgan("dev"));

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(errorHandler);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

server.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`));
