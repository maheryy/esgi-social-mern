import { Outlet } from "react-router-dom";

import UserProvider from "../../services/contexts/Protected/UserContext";


export const ProtectedUser = () => {
  return (
    <UserProvider>
      <Outlet/>
    </UserProvider>
  );
};