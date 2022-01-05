import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({ isLoggedIn: "false" });

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await axios.get("/users");
        setUser({ user: res.data.user, isLoggedIn: res.data.isLoggedIn });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    getUser();
  }, []);

  if (isError) return <h1>Error, try again!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <UserContext.Provider
      value={[user, setUser, isLoading, setIsLoading, isError, setIsError]}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
