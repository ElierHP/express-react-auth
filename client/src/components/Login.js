import React, { useState } from "react";
import { schema } from "../validation/userValidation";
import axios from "axios";

function Login() {
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
    schema
      .isValid({
        name,
        password,
      })
      .then(function (valid) {
        axios.post("/users/new", {
          username: name,
          password,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Login;
