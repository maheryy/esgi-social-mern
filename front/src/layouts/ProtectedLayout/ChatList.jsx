import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/constants";
import { useProtectedContext } from "../../services/hooks";
import { ChatActions } from "../../services/reducers/chat";
import { SidebarChatItem } from "./SidebarChatItem";

export const ChatList = () => {
  const { chats, dispatchChats, selectedChat, extendedSidebar } = useProtectedContext();
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${API_URL}/chat`)
      .then((res) => res.json())
      .then((res) => {
        dispatchChats({
          type: ChatActions.LOAD,
          payload: res.map((item) => ({
            id: item.id,
            label: item.users.map((user) => user.firstname).join(", "),
          }))
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const removeChat = (chatId) => {
    fetch(`${API_URL}/chat/${chatId}`, {
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