import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function Users() {
  const [user, setUser, isLoading, setIsLoading, isError, setIsError] =
    useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios.get("/users").then((res) => {
        setUsers(res.data);
      });
    }
    fetchData();
  }, []);

  const logout = () => {
    axios.post("/users/logout").then((data) => setUser(null));
  };
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      {user && <p>Currently logged in: {user.user.username}</p>}
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
}

export default Users;
