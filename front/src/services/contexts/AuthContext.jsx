import { useEffect } from "react";
import { useState, createContext } from "react";
import { getLocalStorageItem } from "../helpers";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [loggedUser, setLoggedUser] = useState(getLocalStorageItem("userInfo")?.user);
  const [token, setToken] = useState(getLocalStorageItem("userInfo")?.token);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
