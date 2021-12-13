import { useState, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";

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
      <Login />
    </div>
  );
}

export default App;
