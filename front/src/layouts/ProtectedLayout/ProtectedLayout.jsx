import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const ProtectedLayout = () => {

  return (
    <div className="flex w-full">
      <div className="h-screen sm:h-screen min-w-max">
        <Sidebar/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  );
};
