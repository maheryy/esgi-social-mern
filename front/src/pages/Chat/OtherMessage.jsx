import { getTimeFromDate } from "../../services/helpers";

export const OtherMessage = ({ data }) => {
  const renderMessageContent = () => {
    if (data.isDeleted) {
      return <p className="p-3 text-gray-300 italic"> Ce message a été supprimé</p>;
    }

    return (
      <>
        <span
          className={"pt-1.5 px-3 text-xs font-light text-gray-300 " + (data.modifiedAt ? "" : "hidden")}>(modifié)</span>
        <p className={"break-words w-full px-3 pb-1 " + (data.modifiedAt ? "pt-1" : "pt-3")}>{data.content}</p>
        <div
          className="text-xs font-light text-gray-300 w-fit px-2 pb-0.5 self-end flex justify-between flex items-center">
          <span className="">{getTimeFromDate(data.createdAt)}</span>
        </div>
      </>
    );
  };

  return (
    <li className="py-2 w-full flex items-center justify-start">
      <div
        className="flex flex-col relative group max-w-xs sm:max-w-prose rounded-lg border-gray-700 bg-gray-700 text-gray-200 text-sm">
        {renderMessageContent()}
      </div>
    </li>
  );
};
