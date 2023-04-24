const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.options("*", cors());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/index")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  let msg =
    err.message && err.message !== ""
      ? err.message
      : "Something went wrong. Server encountered 500 internal error";
  console.log(err);
  return res.status(500).json({ error: err });
});

mongoose.connect("mongodb://localhost:27017/userDataBase", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

mongoose.connection.on("connected", function () {
  console.log(
    "connection successfull!!!",
    "mongodb://localhost:27017/userDataBase"
  );
  app.listen(process.env.PORT || 5000);
});
