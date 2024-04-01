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
app.use(morgan());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

server.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`));
