import { useReducer, useState, useContext, createContext } from "react";
import chatReducer from "../../reducers/chat";

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

const ChatProvider = ({ children }) => {
  const [messages, dispatch] = useReducer(chatReducer, []);
  const [selected, setSelected] = useState(1);
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider
      value={{ messages, dispatch, selected, setSelected, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
