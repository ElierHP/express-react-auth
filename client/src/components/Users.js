import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function Users() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
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
      {currentUser ? (
        <p>
          Currently logged in as: <b>{currentUser}</b>{" "}
        </p>
      ) : (
        <p>Currently not logged in.</p>
      )}
      {!currentUser && <Link to="/login">Login</Link>}
      {!currentUser && <Link to="/register">Register</Link>}
    </div>
  );
}

export default Users;
