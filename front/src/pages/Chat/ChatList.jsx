import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../services/constants/constants";
import { useChatContext } from "../../services/hooks";

export const ChatList = () => {
  const { chats, setChats, selected, setSelected } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/chat`)
      .then((res) => res.json())
      .then((res) => {
        const results = res.map((item) => ({
          id: item.id,
          label: item.users.map((user) => user.firstname).join(", "),
        }));

        setChats(results);
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
        setChats((oldChats) => oldChats.filter((el) => el.id !== chatId));
        if (selected === chatId) {
          navigate("/chat", { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hidden sm:block sm:basis-1/4 px-4">
      <div className="py-4">
        <div
          className={
            (selected === 0 ? "bg-gray-500 " : "") +
            "hover:bg-gray-500 hover:cursor-pointer"
          }
        >
          <Link
            onClick={() => setSelected(0)}
            className="block w-full h-full"
            to=""
          >
            Mes amis
          </Link>
        </div>
      </div>
      <ul className="py-4">
        {chats.map((el, i) => (
          <li
            key={el.id}
            className={
              (selected === el.id ? "bg-gray-500 " : "") +
              "hover:cursor-pointer hover:bg-gray-500 flex items-center"
            }
          >
            <Link className="block w-10/12 h-full" to={`${el.id}`}>
              {el.label}
            </Link>
            <svg
              onClick={() => removeChat(el.id)}
              className="w-4 h-4 hover:bg-slate-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};
