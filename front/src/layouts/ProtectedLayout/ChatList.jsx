import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/constants";
import { useAuthContext, useProtectedContext } from "../../services/hooks";
import { ChatActions } from "../../services/reducers/chat";
import { SidebarChatItem } from "./SidebarChatItem";
import { EventActions } from "../../services/reducers/event";
import { handleError } from "../../services/errorHandler";

export const ChatList = () => {
  const { chats, dispatchChats, selectedChat, extendedSidebar, event } = useProtectedContext();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    fetch(`${API_URL}/chat`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatchChats({
          type: ChatActions.LOAD,
          payload: res.map((item) => ({
            id: item.id,
            label: item.users.map((user) => user.pseudo).join(", "),
            pictureId: item.users[0].pictureId,
          }))
        });
      })
      .catch((error) => {

        handleError(error);
        console.error(error);
      });
  }, [event[EventActions.USER_NEW_MESSAGE]]);

  const removeChat = (chatId) => {
    fetch(`${API_URL}/chat/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "DELETE",
    })
      .then((res) => {
        dispatchChats({
          type: ChatActions.REMOVE,
          payload: { id: chatId }
        });

        if (selectedChat === chatId) {
          navigate("/friends", { replace: true });
        }
      })
      .catch((error) => {
        handleError(error);
        console.error(error);
      });
  };

  return (
    <ul className="invisible-scrollbar h-full overflow-y-auto">
      {
        chats.map((item) => (
          <SidebarChatItem
            key={item.id}
            data={item}
            visible={extendedSidebar}
            remove={() => removeChat(item.id)}
          />
        ))
      }
    </ul>
  );
};
