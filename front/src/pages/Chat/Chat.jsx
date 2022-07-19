import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../services/constants";
import { usePrevious, useProtectedContext } from "../../services/hooks";
import { Message } from "./Message";
import { MessageActions } from "../../services/reducers/message";
import { Header } from "../../layouts/ProtectedLayout/Header";
import { StudentList } from "../Discover/StudentList";

export const Chat = () => {
  const message = useRef();
  const scrollView = useRef();
  const { messages, dispatchMessages, setSelectedChat } = useProtectedContext();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const countOldMessages = usePrevious(messages.length);

  useEffect(() => {
    message.current.value = "";
    message.current.focus();
    setSelectedChat(parseInt(chatId, 10));

    fetch(`${API_URL}/chat/${chatId}`)
      .then((res) => res.json())
      .then((res) => {
        dispatchMessages({ type: MessageActions.LOAD, payload: res });
      })
      .catch((error) => {
        console.error(error);
        navigate("/chat", { replace: true });
      });
  }, [chatId]);

  useEffect(() => {
    if (countOldMessages !== messages.length) {
      scrollView.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }, [chatId, messages]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();

      if (message.current.value.trim() === "") {
        return;
      }

      const data = {
        conversationId: chatId,
        content: message.current.value.trim(),
      };

      fetch(`${API_URL}/chat/message`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          dispatchMessages({
            type: MessageActions.SEND,
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
    <div className="flex flex-col h-screen border-l border-gray-700 text-gray-300">
      <Header title={"Chat en cours"}/>
      <div className="bg-slate-800 w-full basis-full h-0 px-6 pb-4 flex flex-col justify-between">
        <div className="h-full overflow-y-auto">
          <ul className="py-4" ref={scrollView}>
            {messages.map((el, i) => (
              <Message data={el} key={el.id}/>
            ))}
          </ul>
        </div>
        <div className="py-2">
          <form onSubmit={sendMessage}>
            <input
              className="border-b border-teal-500 appearance-none bg-transparent w-full text-gray-300 focus:outline-none"
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
