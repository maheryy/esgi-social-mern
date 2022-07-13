import ChatProvider from "../../services/contexts/Chat/ChatContext";
import { ChatBox } from "./ChatBox";
import { ChatList } from "./ChatList";

export const Chat = () => {
  return (
    <ChatProvider>
      <div className="flex h-screen">
        <ChatList />
        <ChatBox />
      </div>
    </ChatProvider>
  );
};
