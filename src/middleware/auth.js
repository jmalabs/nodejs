const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "password");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
  } catch (error) {
    res
      .status(401)
      .send({ error: "You do not have access to the requested resource." });
  }
  next();
};

module.exports = auth;
