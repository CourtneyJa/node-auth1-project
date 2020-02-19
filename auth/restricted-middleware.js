const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

module.exports = (req, res, next) => {
  //changed to get a cookie and make its valid
  console.log("req session", req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};
