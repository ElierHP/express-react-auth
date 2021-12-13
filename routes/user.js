const express = require("express");
const router = express.Router();
const users = require("../controllers/user");
const passport = require("passport");

router.route("/").get(users.userData).post();

router.post("/new", users.newUser);

router.post("/login", passport.authenticate("local"), users.login);

module.exports = router;
