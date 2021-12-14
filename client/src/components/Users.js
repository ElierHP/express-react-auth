import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios.get("/users").then((res) => {
        setUsers(res.data);
      });
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Users;
