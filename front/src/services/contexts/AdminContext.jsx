import { useReducer, useState, useEffect, createContext } from "react";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {

  const { loggedUser, token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser || !loggedUser.isAdmin) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        loggedUser,
        token,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
