import { useEffect, useState } from "react";
import { API_URL, STATUS_ACCEPTED, STATUS_CANCELLED, STATUS_HOLD, STATUS_REJECTED } from "../../services/constants";
import FriendListItem from "../../components/FriendListItem";

export const InvitationList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/friends?status=${STATUS_HOLD}&as=target`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const handleInvitation = (relationshipId, status) => {
    fetch(`${API_URL}/friends/${relationshipId}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ status: status })
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
      <div className="py-4">
        <div className="">
          <span
            className="text-xs font-semibold">{users.length <= 1 ? `${users.length} invitation en attente` : `${users.length} invitations en attente`}</span>
        </div>
        <ul className="py-2">
          {
            users.map((item) => (
              <ListItem
                key={item.id}
                data={item}
                action={handleInvitation}
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
        onClick={() => action(data.relationship.id, STATUS_ACCEPTED)}
        className="rounded-full mr-1 text-sm border border-teal-600 bg-teal-600 hover:bg-teal-700 text-white p-2 transition duration-300 ease select-none focus:outline-none focus:shadow-outline"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"/>
        </svg>
      </button>
      <button
        onClick={() => action(data.relationship.id, STATUS_REJECTED)}
        className="rounded-full mr-1 text-sm border border-red-600 bg-red-600 hover:bg-red-700 text-white p-2 transition duration-300 ease select-none focus:outline-none focus:shadow-outline"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"/>
        </svg>
      </button>
    </FriendListItem>
  );
};