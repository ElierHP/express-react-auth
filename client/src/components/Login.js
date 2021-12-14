import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ username, password }) => {
    axios
      .post("/users/login", {
        username,
        password,
      })
      .then(() => (window.location.pathname = "/"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login Form</h1>
        <label htmlFor="username">Username:</label>
        <input id="username" {...register("username")} />
        {errors.username && <span>{errors.username.message}</span>}
        <label htmlFor="password">Password:</label>
        <input id="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Login</button>
      </form>
      <Link to="/register">New User?</Link>
      <Link to="/">User List</Link>
    </div>
  );
}

export default Login;
