const User = require("../models/user");

module.exports.userData = async (req, res) => {
  if (req.user) {
    res.send({ user: req.user, isLoggedIn: true });
  } else {
    res.send({ isLoggedIn: false });
  }
};

module.exports.newUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username: username });
  User.register(user, password, (err) => {
    if (err) {
      console.log("error registering user!", err);
      return next(err);
    }
  });
  req.login(user, function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session.isLoggedIn = true;
  res.send({ user: req.user, isLoggedIn: req.session.isLoggedIn });
};

module.exports.login = (req, res) => {
  req.session.isLoggedIn = true;
  res.send({ user: req.user, isLoggedIn: req.session.isLoggedIn });
};

module.exports.logout = (req, res) => {
  req.logout();
  res.send({ isLoggedIn: false });
};
