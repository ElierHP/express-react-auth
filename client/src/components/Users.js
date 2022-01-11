import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function Users() {
  const [
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  ] = useContext(UserContext);

  useEffect(() => {
    //Check if there is a logged in user on page load
    async function getUser() {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await axios.get("/users");
        if (res.data.isLoggedIn === true) {
          setUser({ username: res.data.user.username });
          setIsLoggedIn(res.data.isLoggedIn);
        } else {
          setIsLoggedIn(res.data.isLoggedIn);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    getUser();
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await axios.post("/users/logout");
      setUser({ username: null });
      setIsLoggedIn(false);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  if (isError) return <h1>Error, try again!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      {isLoggedIn ? (
        <div>
          <h1>User Route</h1>
          <p>This is a protected route.</p>
          <p>Currently logged in as: {user.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Users;
