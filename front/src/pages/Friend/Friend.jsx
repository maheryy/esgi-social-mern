import { FriendList } from "./FriendList";
import { Header } from "../../layouts/ProtectedLayout/Header";
import { Link, Route, Routes } from "react-router-dom";
import { RequestList } from "./RequestList";
import { InvitationList } from "./InvitationList";

export const Friend = () => {
  
  return (
    <div className="flex flex-col h-screen border-l border-gray-700 text-gray-300">
      <Header title={"Mes amis"}>
        <div>
          <Link to="/discover"
                className="hidden sm:block text-sm border border-teal-600 bg-teal-600 text-white rounded-md px-4 py-2 transition duration-300 ease select-none hover:bg-teal-700 focus:outline-none focus:shadow-outline">
            <span>Ajouter un ami</span>
          </Link>
          <Link to="/discover"
                className="block sm:hidden text-sm border border-teal-600 bg-teal-600 text-white rounded-md p-1 transition duration-300 ease select-none hover:bg-teal-700 focus:outline-none focus:shadow-outline">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"/>
            </svg>
          </Link>
        </div>
      </Header>
      <div className="bg-slate-800 w-full basis-full h-0 px-6 py-4">
        <Routes>
          <Route index element={<FriendList/>}/>
          <Route path="requests" element={<RequestList/>}/>
          <Route path="invitations" element={<InvitationList/>}/>
        </Routes>
      </div>
    </div>
  );
};

export const renderTabs = (selected) => {
  const tabList = [
    {
      path: "/friends/",
      label: "Mes amis",
      mobileLabel: "Amis",
    },
    {
      path: "/friends/requests",
      label: "Demandes envoyées",
      mobileLabel: "Envoyées",
    },
    {
      path: "/friends/invitations",
      label: "Invitations reçues",
      mobileLabel: "Reçues",
    },
  ];

  return (
    <ul
      className="mx-auto sm:mx-0 flex items-center justify-center w-fit border-b border-gray-700 text-sm font-semibold">
      {tabList.map((item, key) => (
        <li key={key}>
          <Link
            to={item.path}
            className={"block h-full px-4 py-2 cursor-pointer border-b border-gray-700 hover:border-sky-600 " + (key === selected ? "border-sky-600" : "")}
          >
            <span className="hidden sm:block">{item.label}</span>
            <span className="sm:hidden">{item.mobileLabel ?? item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};