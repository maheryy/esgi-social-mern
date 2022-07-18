import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../services/constants";
import FriendListItem from "../../components/FriendListItem";
import { renderTabs } from "./Friend";

export const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/friends`)
      .then((res) => res.json())
      .then((res) => {
        setFriends(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const removeFriend = (relationshipId) => {
    fetch(`${API_URL}/friends/${relationshipId}`, {
      method: "DELETE"
    })
      .then((res) => {
        setFriends(old => old.filter(el => el.relationship.id !== relationshipId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startConversation = async (friendId) => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ receiverId: friendId }),
      });

      const data = await response.json();

      // New conversation was created
      if (response.status === 201) {
        // setChats((oldChats) => [
        //   {
        //     id: data.id,
        //     label: data.user.firstname,
        //   },
        //   ...oldChats,
        // ]);
      }

      navigate(`/chat/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-11/12 mx-auto px-4">
      <div className="">
        {renderTabs(0)}
      </div>
      <div className="py-4">
        <div className="">
          <span
            className="text-xs font-semibold">{friends.length <= 1 ? `${friends.length} ami` : `${friends.length} amis`}</span>
        </div>
        <ul className="py-2">
          {
            friends.map((item) => (
              <ListItem
                key={item.id}
                data={item}
                chat={() => startConversation(item.id)}
                remove={() => removeFriend(item.relationship.id)}
              />
            ))
          }
        </ul>
      </div>
    </div>
  );
};

const ListItem = ({ data, chat, remove }) => {
  return (
    <FriendListItem data={data}>
      <button
        onClick={chat}
        className="rounded-full mr-1 text-sm border border-sky-600 bg-sky-600 hover:bg-sky-700 text-white p-2 transition duration-300 ease select-none focus:outline-none focus:shadow-outline"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"/>
        </svg>
      </button>
      <button
        onClick={remove}
        className="rounded-full text-sm ml-1 border border-red-600 bg-red-600 hover:bg-red-700 text-white p-2 transition duration-300 ease select-none focus:outline-none focus:shadow-outline"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"/>
        </svg>
      </button>
    </FriendListItem>
  );
};