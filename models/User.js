const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    //will be stored as hashed version of the password string
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
