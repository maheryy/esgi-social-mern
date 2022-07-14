import { Route, Routes } from "react-router-dom";
import ChatProvider from "../../services/contexts/Chat/ChatContext";
import { ChatBox } from "./ChatBox";
import { ChatList } from "./ChatList";
import { FriendList } from "./FriendList";

export const Chat = () => {
  return (
    <ChatProvider>
      <div className="flex h-screen">
        <ChatList />
        <Routes>
          <Route path="" element={<FriendList />} />
          <Route path=":chatId" element={<ChatBox />} />
        </Routes>
      </div>
    </ChatProvider>
  );
};
