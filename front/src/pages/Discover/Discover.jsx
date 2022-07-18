import { StudentList } from "./StudentList";
import { Header } from "../../layouts/ProtectedLayout/Header";

export const Discover = () => {
  return (
    <div className="flex flex-col h-screen border-l border-gray-700 text-gray-300">
      <Header title={"Découvrir des étudiants"}/>
      <div className="bg-slate-800 w-full basis-full px-6 py-4">
        <StudentList/>
      </div>
    </div>
  );
};
