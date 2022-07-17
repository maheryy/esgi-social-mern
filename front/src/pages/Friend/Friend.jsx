import { FriendList } from "./FriendList";
import { Header } from "../../layouts/ProtectedLayout/Header";
import { Link } from "react-router-dom";

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
      <div className="bg-slate-800 w-full basis-full px-6 py-4">
        <FriendList/>
      </div>
    </div>
  );
};
