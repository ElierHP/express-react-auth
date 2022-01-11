import React, { useState, createContext } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({ username: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={[
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      ]}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
