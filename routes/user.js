const express = require("express");
const router = express.Router();
const users = require("../controllers/user");

router.route("/").get(users.userData);

router.post("/new", users.newUser);

module.exports = router;
