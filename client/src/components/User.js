import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const userSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const newUserSchema = yup
  .object({
    username: yup.string().required().min(3).max(30),
    password: yup.string().required().min(6).max(30),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

function User({ newUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newUser ? newUserSchema : userSchema),
  });

  const onSubmit = ({ username, password }) => {
    if (newUser) {
      axios.post("/users/new", {
        username,
        password,
      });
      window.location.pathname = "/";
    }
    axios
      .post("/users/login", {
        username,
        password,
      })
      .then(() => (window.location.pathname = "/"))
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{newUser ? "Register" : "Login Form"}</h1>
      <label htmlFor="username">Username:</label>
      <input id="username" {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
      <label htmlFor="password">Password:</label>
      <input id="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      {newUser && (
        <>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </>
      )}
      <button type="submit">{newUser ? "Sign Up" : "Login"}</button>
    </form>
  );
}

export default User;
