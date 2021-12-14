import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
