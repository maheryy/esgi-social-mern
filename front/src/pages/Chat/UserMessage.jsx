import { useState, useRef, useCallback } from "react";
import { API_URL } from "../../services/constants";
import { MessageActions } from "../../services/reducers/message";
import { getTimeFromDate } from "../../services/helpers";

export const UserMessage = ({ data, dispatch }) => {
  const [editMode, setEditMode] = useState(false);
  const text = useRef();

  const submitEditMessage = useCallback((e) => {
    e.preventDefault();

    if (text.current.value.trim() === "") {
      return;
    }

    fetch(`${API_URL}/chat/message/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text.current.value.trim() }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: MessageActions.EDIT,
          payload: res,
        });
        setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const removeMessage = useCallback(() => {
    fetch(`${API_URL}/chat/message/${data.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: MessageActions.REMOVE,
          payload: res,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const editMessage = useCallback(async () => {
    await setEditMode(true);
    text.current.focus();
  }, []);

  const handleBlurEdit = useCallback(() => {
    if (!editMode) {
      return;
    }
    text.current.value = data.content;
    setEditMode(false);
  }, [editMode]);

  const renderMessageContent = () => {
    if (data.isDeleted) {
      return <p className="p-3 text-gray-300 italic"> Ce message a été supprimé</p>;
    }
    if (editMode) {
      return (
        <div className="p-3 pb-1.5">
          <form onSubmit={submitEditMessage} className="w-fit flex flex-col">
            <input
              className="w-64 sm:w-96 h-5 bg-teal-800 text-gray-300 focus:outline-none appearance-none py-4 px-4 rounded-lg"
              type="text"
              defaultValue={data.content}
              ref={text}
              onBlur={handleBlurEdit}
              placeholder="Modifie ton message"
            />
            <a className="font-light text-xs hover:cursor-pointer self-end pt-1 hover:text-gray-400">Cancel</a>
          </form>
        </div>
      );
    }
    return (
      <>
        <span
          className={"pt-1.5 px-3 text-xs font-light text-gray-300 " + (data.modifiedAt ? "" : "hidden")}>(modifié)</span>
        <p className={"break-words w-full px-3 pb-1 " + (data.modifiedAt ? "pt-1" : "pt-3")}>{data.content}</p>
        <div
          className="text-xs font-light text-gray-300 w-fit px-2 pb-0.5 self-end flex justify-between flex items-center">
          <span className="">{getTimeFromDate(data.createdAt)}</span>
          <span className={"ml-0.5 text-cyan-500 " + (data.readAt ? "" : "hidden")}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </span>
        </div>
        <div className="hidden absolute z-10 top-0 right-0 -translate-y-4 group-hover:block">
          <ul
            className="flex flex-wrap items-center justify-center w-fit px-1 bg-teal-700 border border-teal-700 border rounded-tr-lg rounded-tl-lg">
            <li onClick={editMessage} className="p-0.5 pt-1 hover:cursor-pointer hover:text-yellow-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </li>
            <li className="p-0.5 pt-1 hover:cursor-pointer hover:text-yellow-300" onClick={removeMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <li className="py-2 w-full flex items-center justify-end">
      <div
        className="flex flex-col relative group max-w-xs sm:max-w-prose rounded-lg border-teal-700 bg-teal-700 text-gray-200 text-sm">
        {renderMessageContent()}
      </div>
    </li>
  );
};