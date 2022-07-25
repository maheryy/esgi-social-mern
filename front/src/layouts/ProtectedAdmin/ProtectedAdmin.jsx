import { Outlet } from "react-router-dom";

import AdminProvider from "../../services/contexts/AdminContext";

export const ProtectedAdmin = () => {
  return (
    <AdminProvider>
      <Outlet/>
    </AdminProvider>
  );
};