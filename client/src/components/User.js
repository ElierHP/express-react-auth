import React, { useState } from "react";
import { userSchema } from "../validation/userValidation";
import axios from "axios";

function Login({ newUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser) {
      userSchema
        .validate({ name, password })
        .then(function (value) {
          axios.post("/users/new", {
            username: name,
            password,
          });
          window.location.pathname = "/";
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Not a new user!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{newUser ? "Register" : "Login Form"}</h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={handleNameChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">{newUser ? "Sign Up" : "Login"}</button>
    </form>
  );
}

export default Login;
