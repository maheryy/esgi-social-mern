import { STUDY_LIST } from "../services/constants";

const FriendListItem = ({ data, children }) => {
  return (
    <li className="border-t border-gray-700 cursor-pointer w-full">
      <div className="w-full rounded-sm p-3 hover:bg-gray-700 flex justify-between">
        <div className="flex items-center w-10/12">
          <span className="min-w-max">
            <img
              className="rounded-full w-10 h-10 bg-cover bg-center"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
              alt="profileImage"
            />
          </span>
          <div className="px-2 flex flex-col leading-6 justify-start items-start w-full">
            <span className="font-semibold">
              {data.pseudo} {data.study ? `(${STUDY_LIST[data.study]})` : ''}
            </span>
            {/*<span className="hidden sm:block text-xs font-thin truncate w-32 sm:w-64 hover:text-clip">*/}
            {/*    Lorem ipsum dolor sit amet*/}
            {/*</span>*/}
          </div>
        </div>
        <div className="w-3/12 flex items-center justify-end">
          {/* Set item actions in children */}
          {children}
        </div>
      </div>
    </li>
  );
};

export default FriendListItem;