import { Link } from "react-router-dom";

export const SidebarLinkItem = ({ visible, label, path, icon }) => {
  return (
    <li
      className="px-2 py-1 w-full text-gray-300 hover:text-gray-500 cursor-pointer hover:bg-gray-700 rounded-md ">
      <Link to={path ?? "/"}>
        <span className={"flex items-center " + (visible ? "" : "justify-center")}>
          <span className="w-10 h-10 border-gray-500 flex justify-center items-center w-fit">
            {icon}
          </span>
          <span className={"text-md px-4 " + (visible ? "" : "hidden")}>
            {label}
          </span>
        </span>
      </Link>
    </li>
  );
}