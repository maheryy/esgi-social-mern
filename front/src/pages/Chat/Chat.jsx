import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../services/constants";
import { useAuthContext, usePrevious, useProtectedContext } from "../../services/hooks";
import messageReducer, { MessageActions } from "../../services/reducers/message";
import { Header } from "../../layouts/ProtectedLayout/Header";
import { UserMessage } from "./UserMessage";
import { OtherMessage } from "./OtherMessage";
import Picker from "emoji-picker-react";

export const Chat = () => {
  const message = useRef();
  const scrollView = useRef();
  const { setSelectedChat } = useProtectedContext();
  const [messages, dispatch] = useReducer(messageReducer, []);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const countOldMessages = usePrevious(messages.length);
  const [title, setTitle] = useState("");
  const [emojiPanel, setEmojiPanel] = useState(false);
  const { token, loggedUser } = useAuthContext();

  useEffect(() => {
    message.current.value = "";
    message.current.focus();
    setSelectedChat(parseInt(chatId, 10));

    fetch(`${API_URL}/chat/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.userParticipants.map((el) => el.user.pseudo).join(", "));
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  const emojiHandler = (event, { emoji }) => {
    const parts = [
      message.current.value.substring(0, message.current.selectionStart),
      message.current.value.substring(message.current.selectionStart)
    ];
    message.current.focus();
    message.current.value = `${parts[0]}${emoji}${parts[1]}`;
    message.current.selectionEnd = parts[0].length + emoji.length;
    setEmojiPanel(false);

  };

  const isUserMessage = useCallback((userId) => userId === loggedUser.id, [loggedUser]);

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
        <div className="pt-4">
          <form onSubmit={sendMessage} className="flex">
            <div className="relative flex items-center">
              <span className="px-2 text-gray-300 hover:text-teal-500 cursor-pointer"
                    onClick={() => setEmojiPanel(old => !old)}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                        clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className={"absolute -top-5 -translate-y-full left-0 " + (emojiPanel ? "" : "hidden")}>
                <Picker onEmojiClick={emojiHandler}/>
              </div>
            </div>
            <input
              className="border-b border-teal-500 appearance-none bg-transparent w-full text-gray-300 focus:outline-none"
              type="text"
              autoFocus
              placeholder="Entre ton message..."
              ref={message}
            />
            <button className="px-2 text-gray-300 hover:text-teal-500 appearance-none outline-none">
              <svg className="w-7 h-7 rotate-45" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
