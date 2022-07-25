import { useReducer, useState, createContext, useEffect } from "react";
import chatReducer from "../reducers/chat";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export const ProtectedContext = createContext();

const ProtectedProvider = ({ children }) => {
  const [chats, dispatchChats] = useReducer(chatReducer, []);
  const [extendedSidebar, setExtendedSidebar] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);
  const { loggedUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser || loggedUser.isAdmin) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <ProtectedContext.Provider
      value={{
        chats,
        dispatchChats,
        extendedSidebar,
        setExtendedSidebar,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ProtectedContext.Provider>
  );
};

export default ProtectedProvider;
