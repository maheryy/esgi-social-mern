import { useEffect } from "react";
import { API_URL } from "../../services/constants/constants";
import { useChatContext } from "../../services/contexts/Chat/ChatContext";

export const ChatList = () => {
  const { chats, setChats, selected, setSelected } = useChatContext();

  useEffect(() => {
    fetch(`${API_URL}/chat`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const results = res.map((item) => ({
          id: item.id,
          label: item.users.map((user) => user.firstname).join(", "),
        }));

        setChats(results);
        if (results.length) {
          setSelected(results[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="hidden sm:block sm:basis-1/4 py-8 px-4">
      <ul>
        {chats.map((el, i) => (
          <li
            key={el.id}
            onClick={() => setSelected(el.id)}
            className={
              (selected === el.id ? "bg-gray-500 " : "") +
              "hover:cursor-pointer"
            }
          >
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
