import { Outlet } from "react-router-dom";

import UserProvider from "../../services/contexts/AdminContext";


export const ProtectedAdmin = () => {
  return (
    <UserProvider>
      <Outlet/>
    </UserProvider>
  );
};