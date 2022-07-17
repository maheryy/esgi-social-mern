import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/constants";
import { useChatContext } from "../../services/hooks";
import { FriendActions } from "../../services/reducers/friend";

export const FriendList = () => {
  const { friends, dispatchFriends, setChats } = useChatContext();
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/users?perPage=100`)
      .then((res) => res.json())
      .then((res) => {
        dispatchFriends({
          type: FriendActions.LOAD,
          payload: res,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const startConversation = async (friendId) => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ receiverId: friendId }),
      });

      const data = await response.json();

      // New conversation was created
      if (response.status === 201) {
        setChats((oldChats) => [
          {
            id: data.id,
            label: data.user.firstname,
          },
          ...oldChats,
        ]);
      }

      navigate(`${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredFriends = (term, criteria) =>
    friends.filter((el) =>
      el[criteria].toLowerCase().includes(term.trim().toLowerCase())
    );

  return (
    <div className="basis-full sm:basis-3/4">
      <div>
        <input
          className="border-b border-teal-500 appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
          type="text"
          placeholder="Search your friends..."
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
      </div>
      <ul>
        {filteredFriends(term, "firstname").map((el, i) => (
          <li
            key={el.id}
            onClick={() => startConversation(el.id)}
            className="w-full py-2 hover:cursor-pointer hover:bg-gray-500"
          >
            {el.firstname}
          </li>
        ))}
      </ul>
    </div>
  );
};
