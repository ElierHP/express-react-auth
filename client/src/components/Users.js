import React, { useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function Users() {
  const [user, setUser, isLoading, setIsLoading, isError, setIsError] =
    useContext(UserContext);

  const logout = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await axios.post("/users/logout");
      setUser(res.data.isLoggedIn);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  if (isError) return <h1>Error, try again!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      {user.isLoggedIn === "true" ? (
        <div>
          <h1>User Route</h1>
          <p>This is a protected route.</p>
          <p>Currently logged in as: {user.user.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Users;
