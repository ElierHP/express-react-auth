import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required().min(3).max(30),
    password: yup.string().required().min(6).max(30),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ username, password }) => {
    axios.post("/users/new", {
      username,
      password,
    });
    window.location.pathname = "/";
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <label htmlFor="username">Username:</label>
        <input id="username" {...register("username")} />
        {errors.username && <span>{errors.username.message}</span>}
        <label htmlFor="password">Password:</label>
        <input id="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">Login</Link>
      <Link to="/">User List</Link>
    </div>
  );
}

export default Register;
