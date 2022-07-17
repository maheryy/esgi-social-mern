import { useOutletContext } from "react-router-dom";

export const Header = ({ children, title }) => {
  const { setSidebar } = useOutletContext();

  return (
    <header className="w-full bg-slate-800 text-gray-300 flex justify-between h-16 px-6 items-center drop-shadow-lg">
      <div className="w-fit flex justify-center items-center">
          <span className="block sm:hidden hover:cursor-pointer" onClick={() => setSidebar(old => !old)}>
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"/></svg>
          </span>
        <span className="px-3 font-semibold">{title}</span>
      </div>
      {children}
    </header>
  );
};
