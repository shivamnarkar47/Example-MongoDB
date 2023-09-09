// const { error } = require('console');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");
const port = process.env.port || 3000;
var path = require("path");
const User = require("./models/User");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected ! ");
  })
  .catch((error) => {
    console.log("Error connecting database : ", error);
  });

app.post("/users", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
    });
    await newUser.save();

    // res.status(200).json(newUser);
    res.redirect("/");
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("user-list", { users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log("Server is listening to port", port);
});
