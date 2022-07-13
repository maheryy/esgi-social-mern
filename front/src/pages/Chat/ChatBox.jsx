import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../services/constants/constants";
import { useChatContext } from "../../services/contexts/Chat/ChatContext";
import { ChatActions } from "../../services/reducers/chat";

export const ChatBox = () => {
  const message = useRef();
  const { messages, dispatchMessages, setSelected } = useChatContext();
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    message.current.value = "";
    setSelected(parseInt(chatId, 10));
    fetch(`${API_URL}/chat/${chatId}`)
      .then((res) => res.json())
      .then((res) => {
        dispatchMessages({ type: ChatActions.LOAD, payload: res });
      })
      .catch((error) => {
        console.error(error);
        navigate("/chat", { replace: true });
      });
  }, [chatId]);

  useEffect(() => {
    message.current.focus();
  });

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();

      const data = {
        conversationId: chatId,
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
          dispatchMessages({
            type: ChatActions.SEND,
            payload: res,
          });
        })
        .catch((error) => {
          console.error(error);
        });

      message.current.value = "";
    },
    [chatId]
  );

  return (
    <div className="basis-full sm:basis-3/4">
      <div className="flex flex-col justify-between h-full py-8 px-4">
        <div className="py-4 overflow-y-scroll">
          <ul className="">
            {messages.map((el, i) => (
              <li key={el.id}>
                {el?.user?.firstname ?? "NEED_AUTH"} : {el.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-2">
          <form onSubmit={sendMessage}>
            <input
              className="border-b border-teal-500 appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
              type="text"
              autoFocus
              placeholder="Your message..."
              ref={message}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
