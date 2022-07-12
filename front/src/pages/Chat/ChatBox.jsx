import { useCallback } from "react";
import { useRef } from "react";
import { ChatActions } from "../../services/reducers/chat";

export const ChatBox = ({ messages, dispatch }) => {
  const message = useRef("");

  const sendMessage = useCallback((e) => {
    e.preventDefault();

    dispatch({
      type: ChatActions.SEND,
      payload: {
        author: "John",
        message: message.current.value,
        timestamp: Date.now(),
      },
    });

    message.current.value = "";
  });

  return (
    <div className="basis-full sm:basis-3/4">
      <div className="flex flex-col justify-between h-full py-8 px-4">
        <div className="py-4 overflow-y-scroll">
          <ul className="">
            {messages.map((el, i) => (
              <li key={i}>
                {el.author} : {el.message}
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
