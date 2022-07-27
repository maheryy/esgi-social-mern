import { useReducer, useState, createContext, useEffect } from "react";
import chatReducer from "../reducers/chat";
import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import eventReducer, { EventActions, store } from "../reducers/event";

export const ProtectedContext = createContext();

const ProtectedProvider = ({ children }) => {
  const [chats, dispatchChats] = useReducer(chatReducer, []);
  const [extendedSidebar, setExtendedSidebar] = useState(true);
  const [selectedChat, setSelectedChat] = useState(0);
  const [event, dispatchEvent] = useReducer(eventReducer, store);
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
    const data = JSON.parse(e.data);

    if (data.to === loggedUser.id) {
      dispatchEvent({ type: EventActions.USER_FRIEND_REQUEST });
    }
  };

  const onFriendResponse = (e) => {
    const data = JSON.parse(e.data);

    if (data.to === loggedUser.id) {
      dispatchEvent({ type: EventActions.USER_FRIEND_RESPONSE });
    }
  };

  const onNewMessage = (e) => {
    const data = JSON.parse(e.data);

    // if (data.to === loggedUser.id) {
    dispatchEvent({ type: EventActions.USER_NEW_MESSAGE });
    // }
  };

  const onEditMessage = (e) => {
    const data = JSON.parse(e.data);

    // if (data.to === loggedUser.id) {
    dispatchEvent({ type: EventActions.USER_EDIT_MESSAGE });
    // }
  };

  const onDeleteMessage = (e) => {
    const data = JSON.parse(e.data);

    // if (data.to === loggedUser.id) {
    dispatchEvent({ type: EventActions.USER_DELETE_MESSAGE });
    // }
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
        event
      }}
    >
      {loggedUser && children}
    </ProtectedContext.Provider>
  );
};

export default ProtectedProvider;
