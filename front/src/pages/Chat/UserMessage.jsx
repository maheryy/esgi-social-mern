import { useState, useRef, useCallback } from "react";
import { API_URL } from "../../services/constants";
import { MessageActions } from "../../services/reducers/message";

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

  const cancelEdit = useCallback(() => {
    setEditMode(false);
    text.current.value = data.content;
  }, []);

  const editMessage = useCallback(async () => {
    await setEditMode(true);
    text.current.focus();
  }, []);

  return (
    <li className="py-2 w-full flex items-center justify-end">
      <div className="relative group w-10/12 sm:max-w-lg p-4 rounded-md border-teal-300 bg-teal-500">
        <span className={"" + (editMode ? "hidden" : "")}>
          {!data.isDeleted ? data.content : "Ce message a été supprimé"}
        </span>
        <div className={"" + (!editMode ? "hidden" : "")}>
          <form onSubmit={submitEditMessage} className="w-full">
            <input
              className="w-full"
              type="text"
              defaultValue={data.content}
              ref={text}
              onBlur={cancelEdit}
              placeholder="Modifie ton message"
            />
          </form>
          <a
            onClick={cancelEdit}
            className="font-light text-sm hover:cursor-pointer"
          >
            Cancel
          </a>
        </div>
        {!data.isDeleted && (
          <div className="hidden group-hover:block absolute z-10 top-0 right-0 py-1">
            <ul className="flex">
              <li
                onClick={editMessage}
                className="px-1 w-fit h-fit hover:cursor-pointer hover:text-yellow-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </li>
              <li
                onClick={removeMessage}
                className="px-1 w-fit h-fit hover:cursor-pointer hover:text-yellow-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};
