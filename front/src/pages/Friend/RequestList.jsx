import { useEffect, useState } from "react";
import { API_URL, STATUS_CANCELLED, STATUS_HOLD } from "../../services/constants";
import FriendListItem from "../../components/FriendListItem";
import { renderTabs } from "./Friend";

export const RequestList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/friends?status=${STATUS_HOLD}&as=requestor`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const cancelRequest = (relationshipId) => {
    fetch(`${API_URL}/friends/${relationshipId}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ status: STATUS_CANCELLED })
    })
      .then(res => res.json())
      .then((res) => {
        setUsers(old => old.filter(el => el.relationship.id !== relationshipId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-11/12 mx-auto px-4">
      <div className="">
        {renderTabs(1)}
      </div>
      <div className="py-4">
        <div className="">
          <span className="text-xs font-semibold">{users.length <= 1 ? `${users.length} demande envoyée` : `${users.length} demandes envoyées`}</span>
        </div>
        <ul className="py-2">
          {
            users.map((item) => (
              <ListItem
                key={item.id}
                data={item}
                action={() => cancelRequest(item.relationship.id)}
              />
            ))
          }
        </ul>
      </div>
    </div>
  );
};

const ListItem = ({ data, action }) => {
  return (
    <FriendListItem data={data}>
      <button
        onClick={action}
        className="rounded-full text-sm border border-red-600 bg-red-600 hover:bg-red-700 text-white p-2 transition duration-300 ease select-none focus:outline-none focus:shadow-outline"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"/>
        </svg>
      </button>
    </FriendListItem>
  );
};