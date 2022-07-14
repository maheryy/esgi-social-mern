export const OtherMessage = ({ data }) => {
  return (
    <li className="py-2 w-full flex items-center justify-start">
      <div className="relative group w-10/12 sm:max-w-lg p-4 rounded-md border-slate-700 bg-slate-300">
        <span className="">
          {!data.isDeleted ? data.content : "Ce message a été supprimé"}
        </span>
      </div>
    </li>
  );
};
