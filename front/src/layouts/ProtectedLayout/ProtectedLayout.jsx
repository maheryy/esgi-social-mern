import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const ProtectedLayout = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="flex w-full w-screen">
      <div className="h-screen max-h-screen sm:h-screen min-w-max">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      </div>
      <div id="content-container" className="w-full h-screen max-h-screen">
        <Outlet context={{ sidebar, setSidebar }}/>
      </div>
    </div>
  );
};
