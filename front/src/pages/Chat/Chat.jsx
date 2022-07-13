import { useReducer, useEffect, useState } from "react";
import { API_URL } from "../../services/constants/constants";
import chatReducer, { ChatActions } from "../../services/reducers/chat";
import { ChatBox } from "./ChatBox";
import { ChatList } from "./ChatList";

export const Chat = () => {
  const [messages, dispatch] = useReducer(chatReducer, []);
  const [selected, setSelected] = useState(1);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/chat`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const results = res.map((item) => ({
          id: item.id,
          label: item.users.map((user) => user.firstname).join(", "),
        }));

        setChats(results);
        if (results.length) {
          setSelected(results[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  return (
    <>
      <div className="flex h-screen">
        <ChatList selected={selected} setSelected={setSelected} chats={chats} />
        <ChatBox chatId={selected} messages={messages} dispatch={dispatch} />
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
