import { Outlet } from "react-router-dom";

import AdminProvider from "../../services/contexts/AdminContext";
import Sidebar from "../../pages/Admin/Sidebar";

export const ProtectedAdmin = () => {
  return (
    <AdminProvider>
        <div className="flex justify-start">
            <Sidebar/>
            <Outlet />
        </div>
    </AdminProvider>
  );
};