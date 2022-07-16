import { useReducer, useState, useContext, createContext } from "react";
import chatReducer from "../../reducers/chat";
import friendReducer from "../../reducers/friend";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, dispatchMessages] = useReducer(chatReducer, []);
  const [friends, dispatchFriends] = useReducer(friendReducer, []);
  const [selected, setSelected] = useState(0);
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        dispatchMessages,
        friends,
        dispatchFriends,
        selected,
        setSelected,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
