import { useReducer, useState, createContext } from "react";
import chatReducer from "../../reducers/chat";

export const ProtectedContext = createContext();

const ProtectedProvider = ({ children }) => {
  const [chats, dispatchChats] = useReducer(chatReducer, []);
  const [extendedSidebar, setExtendedSidebar] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <ProtectedContext.Provider
      value={{
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
