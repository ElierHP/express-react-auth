import { useState, useEffect } from "react";
import User from "./components/User";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

function App() {
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
      <Routes>
        <Route path="/login" element={<User />} />
        <Route path="/register" element={<User newUser={true} />} />
      </Routes>
    </div>
  );
}

export default App;
