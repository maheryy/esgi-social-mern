import { Link, useNavigate } from "react-router-dom";
import { SidebarLinkItem } from "./SidebarLinkItem";
import { SidebarChatItem } from "./SidebarChatItem";
import { useProtectedContext } from "../../services/hooks";
import { ChatList } from "./ChatList";

export const Sidebar = () => {
  const navigate = useNavigate();
    const logout = ()=>{

        localStorage.clear()
        navigate(navigate('/Login', {replace:true}));

    }
  const {extendedSidebar, setExtendedSidebar} = useProtectedContext();
  return (
    <div
      className={"text-sm relative bg-gray-800 shadow p-4 h-full max-h-max justify-between sm:flex flex-col " + (extendedSidebar ? "flex basis-72 w-72" : "hidden basis-24 w-24")}>
      <div
        className={"hidden sm:flex h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 items-center shadow justify-center cursor-pointer text-gray-300 " + (extendedSidebar ? "rounded-tr rounded-br" : "rotate-180 rounded-tl rounded-bl")}
        onClick={() => setExtendedSidebar((old) => !old)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </div>
      <div className="pt-1 pb-3">
        <ul className="">
          {/*<SidebarLinkItem*/}
          {/*  visible={extendedSidebar}*/}
          {/*  path={"/friends"}*/}
          {/*  label={"Accueil"}*/}
          {/*  icon={*/}
          {/*    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">*/}
          {/*      <path*/}
          {/*        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>*/}
          {/*    </svg>*/}
          {/*  }/>*/}
          <SidebarLinkItem
            visible={extendedSidebar}
            path={"/friends"}
            label={"Amis"}
            icon={
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            }/>
          <SidebarLinkItem
            visible={extendedSidebar}
            path={"/discover"}
            label={"Découvrir"}
            icon={
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"/>
              </svg>
            }/>
        </ul>
      </div>
      <div className="h-5/6 overflow-hidden border-t border-gray-700 py-2">
        <span className={"text-sm font-semibold text-gray-300 block w-full pt-1 pb-3 " + (extendedSidebar ? "" : "hidden")}>Conversations récentes</span>
        <ChatList />
      </div>
      <div className="sm:block border-t border-gray-700">
        <ul className="w-full flex items-center justify-around pt-4 text-gray-300">
          <li className={"cursor-pointer px-2 hover:text-gray-500 " + (extendedSidebar ? "" : "block")}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"/>
            </svg>
          </li>
          <li onClick={logout}  
          className={"cursor-pointer px-2 hover:text-gray-500 " + (extendedSidebar ? "" : "hidden")}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"/>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};