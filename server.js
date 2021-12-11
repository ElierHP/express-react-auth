const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/auth")
  .catch((error) => handleError(error));

// Config
app.use(cookieParser());
app.use(
  session({
    secret: "temporary-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/users", (req, res) => {
  const accounts = [
    { username: "john", password: "iofmrfm404", id: 0 },
    { username: "mary", password: "iof21304", id: 1 },
    { username: "charlie", password: "iof1235404", id: 2 },
  ];
  res.json(accounts);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
