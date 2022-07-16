import { useState } from "react";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div
      className={"relative bg-gray-800 shadow p-4 h-full justify-between sm:flex flex-col " + (sidebar ? "basis-80 w-80" : "basis-24 w-24")}>
      <div
        className={"h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow justify-center cursor-pointer text-gray-300 " + (sidebar ? "rounded-tr rounded-br" : "rotate-180 rounded-tl rounded-bl")}
        onClick={() => setSidebar((old) => !old)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
      </div>
      <div className="py-2">
        <ul className="">
          <RegularItem
            visible={sidebar}
            label={"Accueil"}
            icon={
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            }/>
          <RegularItem
            visible={sidebar}
            label={"Amis"}
            icon={
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            }/>
        </ul>
      </div>
      <div className="h-3/4 overflow-hidden border-t border-gray-700 py-2">
        <span className={"text-sm font-semibold text-gray-300 block w-full pb-2 " + (sidebar ? "" : "hidden")}>Conversation récentes</span>
        <ul className="invisible-scrollbar h-full overflow-y-auto">
          {/*<ChatItem visible={sidebar} label={"Content flss"}/>*/}
          {/*<ChatItem visible={sidebar} label={"Content flss"}/>*/}
          {/*<ChatItem visible={sidebar} label={"Content flss"}/>*/}
          {/*<ChatItem visible={sidebar} label={"Content flss"}/>*/}
          {/*<ChatItem visible={sidebar} label={"Content flss"}/>*/}
          {/*<ChatItem visible={sidebar} label={"Content flss"}/>*/}
          <ChatItem visible={sidebar} label={"Content flss"}/>
          <ChatItem visible={sidebar} label={"Content flss"}/>
          <ChatItem visible={sidebar} label={"Content flss"}/>
          <ChatItem visible={sidebar} label={"Content flss"}/>
          <ChatItem visible={sidebar} label={"Content flss"}/>
          <ChatItem visible={sidebar} label={"Content flss"}/>
          <ChatItem visible={sidebar} label={"Content flss"}/>
        </ul>
      </div>
      <div className={"hidden sm:block border-t border-gray-700 " + (sidebar ? "" : "sm:hidden")}>
        <ul className="w-full flex items-center justify-between bg-gray-800">
          <li className="cursor-pointer text-white pt-5 pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={20}
                 height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                 strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"/>
              <path d="M9 17v1a3 3 0 0 0 6 0v-1"/>
            </svg>
          </li>
          <li className="cursor-pointer text-white pt-5 pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={20}
                 height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                 strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"/>
              <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"/>
            </svg>
          </li>
          <li className="cursor-pointer text-white pt-5 pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width={20}
                 height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                 strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <circle cx={12} cy={12} r={3}/>
            </svg>
          </li>
          <li className="cursor-pointer text-white pt-5 pb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-archive" width={20}
                 height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                 strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <rect x={3} y={4} width={18} height={4} rx={2}/>
              <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"/>
              <line x1={10} y1={12} x2={14} y2={12}/>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ChatItem = ({ visible, label, icon }) => {
  return (
    <li
      className="px-2 flex w-full items-center py-2.5 text-gray-300 hover:text-gray-500 cursor-pointer hover:bg-gray-700 rounded-md">
      <div className="text-2xl flex justify-center items-center">
        <img
          className="rounded-full w-12 h-12 bg-cover bg-center "
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
          alt="profileImage"
        />
      </div>
      <div className={"text-md px-4 " + (visible ? "" : "hidden")}>
        {label}
      </div>
    </li>
  );
};

const RegularItem = ({ visible, label, icon }) => {
  return (
    <li
      className="p-2 py-1 flex w-full items-center text-gray-300 hover:text-gray-500 cursor-pointer hover:bg-gray-700 rounded-md">
      <div className="w-12 h-12 border-gray-500 flex justify-center items-center w-fit">
        {icon}
      </div>
      <div className={"text-md px-2 " + (visible ? "" : "hidden")}>
        {label}
      </div>
    </li>
  );
};