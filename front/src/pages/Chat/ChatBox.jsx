import { useCallback, useEffect, useRef } from "react";
import { API_URL } from "../../services/constants/constants";
import { useChatContext } from "../../services/contexts/Chat/ChatContext";
import { ChatActions } from "../../services/reducers/chat";

export const ChatBox = () => {
  const message = useRef("");
  const { messages, dispatch, selected } = useChatContext();

  useEffect(() => {
    fetch(`${API_URL}/chat/${selected}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: ChatActions.LOAD, payload: res });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selected]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        conversationId: selected,
        content: message.current.value,
      };

      fetch(`${API_URL}/chat/message`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch({
            type: ChatActions.SEND,
            payload: res,
          });
        })
        .catch((error) => {
          console.error(error);
        });

      message.current.value = "";
    },
    [selected]
  );

  return (
    <div className="basis-full sm:basis-3/4">
      <div className="flex flex-col justify-between h-full py-8 px-4">
        <div className="py-4 overflow-y-scroll">
          <ul className="">
            {messages.map((el, i) => (
              <li key={el.id}>
                {el?.user?.firstname ?? "BLANK"} : {el.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-2">
          <form onSubmit={sendMessage}>
            <input
              className="border-b border-teal-500 appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
              type="text"
              placeholder="Your message..."
              ref={message}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
