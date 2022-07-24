import { useReducer, useState, createContext } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

  const [loggedUser, setLoggedUser]= useState(null);
  const [token, setToken] = useState("");

  return (
    <AdminContext.Provider
      value={{
        loggedUser, 
        setLoggedUser,
        token,
        setToken
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
