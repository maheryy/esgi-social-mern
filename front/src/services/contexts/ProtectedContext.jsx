import { useReducer, useState, createContext, useEffect } from "react";
import chatReducer from "../reducers/chat";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

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
      return;
    }

    const es = new EventSource(`${API_URL}/sse`);
    es.addEventListener("friend-request", onFriendRequest);
    es.addEventListener("friend-response", onFriendResponse);
    es.addEventListener("new-message", onNewMessage);
    es.addEventListener("edit-message", onEditMessage);
    es.addEventListener("delete-message", onDeleteMessage);
    es.onerror = (error) => {
      console.error(error);
    };

    return () => {
      es.removeEventListener("friend-request", onFriendRequest);
      es.removeEventListener("friend-response", onFriendResponse);
      es.removeEventListener("new-message", onNewMessage);
      es.removeEventListener("edit-message", onEditMessage);
      es.removeEventListener("delete-message", onDeleteMessage);
      es.close();
    };
  }, []);

  const onFriendRequest = (e) => {
    console.log(e);
  };

  const onFriendResponse = (e) => {
    console.log(e);
  };

  const onNewMessage = (e) => {
    console.log(e);
  };

  const onEditMessage = (e) => {
    console.log(e);
  };

  const onDeleteMessage = (e) => {
    console.log(e);
  };

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
