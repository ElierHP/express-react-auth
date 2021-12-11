const express = require("express");
const router = express.Router();
const users = require("../controllers/user");

router.route("/").get(users.userData);

module.exports = router;
