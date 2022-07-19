const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
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

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  return jwt.sign({ _id: user._id.toString() }, "password");
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(user.password, 8);
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
