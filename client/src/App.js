import { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch("/users")
        .then((response) => response.json())
        .then((data) => setUsers(data));
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            name: {user.username} password: {user.password}
          </li>
        ))}
      </ul>
      <Login />
    </div>
  );
}

export default App;
