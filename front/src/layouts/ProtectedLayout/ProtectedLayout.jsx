import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import ProtectedProvider from "../../services/contexts/Protected/ProtectedContext";

export const ProtectedLayout = () => {
  return (
    <ProtectedProvider>
      <div className="flex w-full w-screen h-screen">
        <div className="h-screen max-h-screen sm:h-screen min-w-max">
          <Sidebar/>
        </div>
        <div className="w-full h-screen max-h-screen">
          <Outlet/>
        </div>
      </div>
    </ProtectedProvider>
  );
};
