import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { API_URL } from "../../services/constants/constants";
import { FriendActions } from "../../services/reducers/friend";

export const FriendList = (endppoint) => {
  const { friends, dispatch } = useOutletContext();

  useEffect(() => {
    fetch(`${API_URL}/friends`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: FriendActions.LOAD,
          payload: res,
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return (
    <div className="w-5/6 border border-amber-50 mx-auto">
      <ul className="p-4">
        {
          friends.map((item) => (
            <Item key={item.id} data={item} />
          ))
        }
      </ul>
    </div>
  );
};


const Item = ({data}) => {
  return (
      <li className="border border-gray-400 p-6 hover:bg-gray-300">
        {data.user.firstname}
      </li>
  );
}