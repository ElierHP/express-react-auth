import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Login({ newUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ username, password }) => {
    axios.post("/users/new", {
      username,
      password,
    });
    window.location.pathname = "/";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{newUser ? "Register" : "Login Form"}</h1>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        {...register("username", {
          required: "This field is required",
          minLength: {
            value: 3,
            message: "Must be longer than 3 characters",
          },
          maxLength: {
            value: 20,
            message: "Must be less than 20 characters.",
          },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        {...register("password", {
          required: "This field is required",
          minLength: {
            value: 6,
            message: "Must be longer than 6 characters",
          },
          maxLength: {
            value: 30,
            message: "Must be less than 30 characters.",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">{newUser ? "Sign Up" : "Login"}</button>
    </form>
  );
}

export default Login;
