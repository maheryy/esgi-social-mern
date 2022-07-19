import { useReducer, useState, useContext, createContext } from "react";
import chatReducer from "../../reducers/chat";
import messageReducer from "../../reducers/message";

export const ProtectedContext = createContext();

const ProtectedProvider = ({ children }) => {
  const [messages, dispatchMessages] = useReducer(messageReducer, []);
  const [chats, dispatchChats] = useReducer(chatReducer, []);
  const [extendedSidebar, setExtendedSidebar] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <ProtectedContext.Provider
      value={{
        messages,
        dispatchMessages,
        chats,
        dispatchChats,
        extendedSidebar,
        setExtendedSidebar,
        selectedChat,
        setSelectedChat
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
};

export default ProtectedProvider;
