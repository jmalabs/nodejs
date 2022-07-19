const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Weak password");
      }
    },
  },
  age: {
    type: Number,
  },
});

module.exports = User;
