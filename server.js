const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//env variables
const dotenv = require("dotenv").config();
console.log(process.env)

const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// ALLOW CORS
const allowCrossDomain = function(req, res, next) {
  console.log("it's CORS, bitch")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
};

app.use(allowCrossDomain);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes 
app.get("/ping", function (reg, res) {
  console.log("ping!!!!")
  res.sendStatus(200);
}) 


app.use("/api/users", users);
app.use("/api/items", items)


// app.use("*", (req, res) =>
//  res.sendStatus(404)
// );

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
