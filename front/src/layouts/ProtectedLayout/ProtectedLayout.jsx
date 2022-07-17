import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useReducer, useState } from "react";
import friendReducer from "../../services/reducers/friend";

export const ProtectedLayout = () => {
  const [friends, dispatch] = useReducer(friendReducer, []);
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="flex w-full w-screen">
      <div className="h-screen max-h-screen sm:h-screen min-w-max">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      </div>
      <div id="content-container" className="w-full h-screen max-h-screen">
        <Outlet context={{friends, dispatch, sidebar, setSidebar}}/>
      </div>
    </div>
  );
};
