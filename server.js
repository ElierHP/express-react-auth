const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/user");

const app = express();

// Connect Mongoose
mongoose
  .connect("mongodb://localhost:27017/auth")
  .catch((error) => handleError(error));

// Config
app.use(express.json());
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

//Routes
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
