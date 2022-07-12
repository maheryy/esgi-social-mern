import { useReducer, useEffect, useState } from "react";
import chatReducer, { ChatActions } from "../../services/reducers/chat";
import { ChatBox } from "./ChatBox";
import { ChatList } from "./ChatList";

export const Chat = () => {
  const [messages, dispatch] = useReducer(chatReducer, []);
  const [selected, setSelected] = useState(1);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    //fetch user chats
    setChats(fakeChats);
    setSelected(1);
  }, []);

  useEffect(() => {
    //Fetch chat data => messages
    dispatch({ type: ChatActions.LOAD, payload: fakeMessages });
  }, [selected]);

  return (
    <>
      <div className="flex h-screen">
        <ChatList selected={selected} setSelected={setSelected} chats={chats} />
        <ChatBox messages={messages} dispatch={dispatch} />
      </div>
    </>
  );
};

const fakeChats = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "John",
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "John",
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "John",
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "John",
  },
];

const fakeMessages = [
  {
    author: "John",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam",
  },
  {
    author: "Paul",
    message:
      "nulla excepturi consectetur quasi in nesciunt aspernatur. Obcaecati, voluptates numquam.",
  },
  {
    author: "Paul",
    message:
      "nulla excepturi consectetur quasi in nesciunt aspernatur. Obcaecati, voluptates numquam.",
  },
  {
    author: "Paul",
    message:
      "nulla excepturi consectetur quasi in nesciunt aspernatur. Obcaecati, voluptates numquam.",
  },
  {
    author: "John",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam",
  },
  {
    author: "Paul",
    message:
      "nulla excepturi consectetur quasi in nesciunt aspernatur. Obcaecati, voluptates numquam.",
  },
  {
    author: "John",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam",
  },
];
