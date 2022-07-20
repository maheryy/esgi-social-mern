import { useProtectedContext } from "../../services/hooks";

export const Header = ({ children, title, icon }) => {
  const { setExtendedSidebar } = useProtectedContext();

  return (
    <header className="w-full bg-slate-800 text-gray-300 flex justify-between h-16 px-6 items-center drop-shadow-lg">
      <div className="w-fit flex justify-center items-center">
          <span className="block sm:hidden hover:cursor-pointer" onClick={() => setExtendedSidebar(old => !old)}>
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"/></svg>
          </span>
        <div className="px-3 font-semibold flex items-center">
          {
            icon &&
            <img
              className="rounded-full w-8 h-8 bg-cover bg-center mr-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
              alt="profileImage"
            />
          }
          <span>{title}</span>
        </div>
      </div>
      {children}
    </header>
  );
};
