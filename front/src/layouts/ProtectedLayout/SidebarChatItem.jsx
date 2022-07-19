import { Link } from "react-router-dom";

export const SidebarChatItem = ({ data, visible, remove }) => {
  const isSelected = () => {
    const match = window.location.pathname.match(/\/chat\/(\d+)/);
    return match ? parseInt(match[1], 10) === data.id : false;
  };

  return (
    <li
      className={"px-2 flex w-full items-center group text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-gray-500 rounded-md justify-between " + (isSelected() ? "bg-gray-700 text-gray-500" : "")}>
      <Link
        to={`/chat/${data.id}`}
        className={"w-full py-2.5 flex items-center justify-start" + (visible ? "" : "justify-center")}
      >
          <span className="flex justify-center items-center">
            <img
              className="rounded-full w-12 h-12 bg-cover bg-center "
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
              alt="profileImage"
            />
          </span>
        <span className={"text-md px-4 " + (visible ? "" : "hidden")}>{data.label}</span>
      </Link>
      <div
        onClick={remove}
        className={"hidden hover:text-gray-300 " + (visible ? "group-hover:block" : "hidden")}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
    </li>
  );
};
