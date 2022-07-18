import { useCallback, useEffect, useMemo, useState } from "react";
import { API_URL, STUDY_LIST, TECH_LIST } from "../../services/constants";
import { fromObjectListToSelectOptions } from "../../services/helpers";
import Searchbar from "../../components/Searchbar";
import MultiSelectFilter from "../../components/MultiSelectFilter";
import FriendListItem from "../../components/FriendListItem";
import { ActionButton } from "./ActionButton";

export const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [term, setTerm] = useState("");
  const [filterTech, setFilterTech] = useState([]);
  const [filterStudy, setFilterStudy] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/friends/discover?query=${term.trim()}`)
      .then((res) => res.json())
      .then((res) => {
        setStudents(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [term]);

  const sendFriendRequest = useCallback((id) => {
    fetch(`${API_URL}/friends`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ targetId: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        setStudents(old => old.map(el => el.id === id ? { ...el, relationship: res } : el));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto px-4">
      <div className="w-full py-2">
        <Searchbar value={term} setValue={setTerm} placeholder="Rechercher des étudiants inscrits..."/>
      </div>
      <div className="py-2 w-full flex justify-between flex-col sm:flex-row">
        <div className="basis-1/2 w-full sm:w-auto pb-1 sm:pb-0 sm:pr-2">
          <MultiSelectFilter
            className={"text-xs w-full"}
            items={fromObjectListToSelectOptions(TECH_LIST)}
            selected={filterTech}
            setSelected={setFilterTech}
            placeholder={"Technologies"}
          />
        </div>
        <div className="basis-1/2 w-full sm:w-auto pt-1 sm:pt-0 sm:pl-2">
          <MultiSelectFilter
            className={"text-xs w-full"}
            items={fromObjectListToSelectOptions(STUDY_LIST)}
            selected={filterStudy}
            setSelected={setFilterStudy}
            placeholder={"Filiaires"}
          />
        </div>
      </div>
      <div className="py-4">
        <div className="">
          <span className="text-xs font-semibold">{students.length} étudiants trouvés</span>
        </div>
        <ul className="py-2 w-full">
          {
            students.map((item) => (
              <FriendListItem key={item.id} data={item}>
                <ActionButton status={item.relationship?.status} action={() => sendFriendRequest(item.id)}/>
              </FriendListItem>
            ))
          }
        </ul>
      </div>
    </div>
  );
};