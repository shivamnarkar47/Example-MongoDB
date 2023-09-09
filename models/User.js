const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model("User", userSchema, "custom_users");

module.exports = User;
