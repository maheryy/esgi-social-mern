export const SidebarChatItem = ({ visible, label, icon }) => {
  return (
    <li
      className={"px-2 flex w-full items-center py-2.5 text-gray-300 hover:text-gray-500 cursor-pointer hover:bg-gray-700 rounded-md " + (visible ? "" : "justify-center")}>
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
