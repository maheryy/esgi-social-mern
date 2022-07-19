import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../services/constants";
import { usePrevious, useProtectedContext } from "../../services/hooks";
import messageReducer, { MessageActions } from "../../services/reducers/message";
import { Header } from "../../layouts/ProtectedLayout/Header";
import { UserMessage } from "./UserMessage";
import { OtherMessage } from "./OtherMessage";

export const Chat = () => {
  const message = useRef();
  const scrollView = useRef();
  const { setSelectedChat } = useProtectedContext();
  const [messages, dispatch] = useReducer(messageReducer, []);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const countOldMessages = usePrevious(messages.length);
  const [title, setTitle] = useState("");

  useEffect(() => {
    message.current.value = "";
    message.current.focus();
    setSelectedChat(parseInt(chatId, 10));

    fetch(`${API_URL}/chat/${chatId}`)
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.userParticipants.map((el) => el.user.firstname).join(', '));
        dispatch({ type: MessageActions.LOAD, payload: res.messages });
      })
      .catch((error) => {
        console.error(error);
        navigate("/friends", { replace: true });
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
          dispatch({
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

  // TODO : change this when auth works
  const isUserMessage = useCallback((userId) => userId === 1, []);

  return (
    <div className="flex flex-col h-screen border-l border-gray-700 text-gray-300">
      <Header title={title} icon={true}/>
      <div className="bg-slate-800 w-full basis-full h-0 px-6 pb-4 flex flex-col justify-between">
        <div className="h-full overflow-y-auto scrollbar-dark">
          <ul className="py-4 px-2" ref={scrollView}>
            {messages.map((item) => (
              isUserMessage(item.userId)
                ? <UserMessage key={item.id} data={item} dispatch={dispatch}/>
                : <OtherMessage key={item.id} data={item}/>
            ))}
          </ul>
        </div>
        <div className="py-2">
          <form onSubmit={sendMessage} className="flex">
            <input
              className="border-b border-teal-500 appearance-none bg-transparent w-full text-gray-300 focus:outline-none"
              type="text"
              autoFocus
              placeholder="Entre ton message..."
              ref={message}
            />
            <button className="px-2 text-gray-300 hover:text-teal-500 appearance-none outline-none">
              <svg className="w-7 h-7 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
