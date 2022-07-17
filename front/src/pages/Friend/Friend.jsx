import { FriendList } from "./FriendList";
import { useOutletContext } from "react-router-dom";
import { Header } from "../../layouts/ProtectedLayout/Header";

export const Friend = () => {
  const { setSidebar } = useOutletContext();

  return (
    <div className="flex flex-col h-screen border-l border-gray-700 text-gray-300">
      <Header title={"Mes amis"}>
        <div>
          <button
            type="button"
            className="hidden sm:block text-sm border border-teal-600 bg-teal-600 text-white rounded-md px-4 py-2 transition duration-300 ease select-none hover:bg-teal-700 focus:outline-none focus:shadow-outline"
          >
            Ajouter un ami
          </button>
          <button className="sm:hidden text-sm border border-teal-600 bg-teal-600 text-white rounded-md p-2 transition duration-300 ease select-none hover:bg-teal-700 focus:outline-none focus:shadow-outline">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </Header>
      <div className="bg-slate-800 w-full basis-full px-6 py-4">
        <FriendList/>
      </div>
    </div>
  );
};
