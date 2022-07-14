import { useReducer, useState, useContext, createContext } from "react";
import chatReducer from "../../reducers/chat";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, dispatchMessages] = useReducer(chatReducer, []);
  const [friends, dispatchFriends] = useReducer(chatReducer, []);
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
