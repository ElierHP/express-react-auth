import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const [user, setUser, isLoading, setIsLoading, isError, setIsError] =
    useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ username, password }) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await axios.post("/users/login", {
        username,
        password,
      });
      setUser({ user: res.data.user, isLoggedIn: res.data.isLoggedIn });
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  console.log(user);
  if (isError) return <h1>Error, try again!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
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
      <Link to="/">User Route</Link>
      {user.isLoggedIn === "true" && <Navigate to="/" />}
    </div>
  );
}

export default Login;
