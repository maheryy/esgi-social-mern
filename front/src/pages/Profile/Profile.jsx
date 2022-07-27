import { API_URL, STUDY_LIST, TECH_LIST } from "../../services/constants";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiSelectFilter from "../../components/MultiSelectFilter";
import { fromObjectListToSelectOptions } from "../../services/helpers";
import { useAuthContext } from "../../services/hooks";


export const Profile = () => {

  const { token, loggedUser } = useAuthContext();

  const [firstname, setFirstnameReg] = useState(loggedUser.firstname);
  const [pseudo, setPseudoReg] = useState(loggedUser.pseudo);
  const [mail, setMailReg] = useState(loggedUser.mail);
  const [pwd, setPwdReg] = useState(loggedUser.password);
  const [techChecked, setTechReg] = useState(loggedUser.techList);
  const [studyChecked, setStudyReg] = useState(loggedUser.studyList);
  const [state, setState] = useState("");
  const [response, setResponse] = useState("");
  const [picture, setPicture] = useState(loggedUser.pictureId);


  
  const handleCheckStudy = (e) => {
    setStudyReg(e.target.value);
  };

  const regForm = async (e) => {
    e.preventDefault();
    try {

      const user = {
        firstname: firstname,
        email: mail,
        password: pwd,
        pseudo: pseudo,
        techList: techChecked,
        studyList: studyChecked,
        pictureId: picture,

      };

      console.log(user)

      const res = await fetch(`${API_URL}/users/${loggedUser.id}`, {
        headers: {
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(res);
      console.log(data);

      setResponse(res);
      setState(data);

    } catch (err) {
      console.log(err);
    }
  };

  


  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          
            <h3 className="text-4xl font-bold text-purple-600">
              Profil utilisateur
            </h3>
          

        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:w-3/5 sm:rounded-lg">
          <form>
            <div className="flex flex-wrap -mx-3 mb-6 mt-3 ">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                       htmlFor="grid-firstname">
                  Prenom
                </label>
                <input
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-firstname"
                  type="text"
                  value={loggedUser.firstname}
                  onChange={(e) => setFirstnameReg(e.target.value)}/>
                  { state?.firstname == "Validation len on firstname failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez saisir un prenom valide de plus de 3 caracteres" }
                  </p>}
              </div>
            </div>
            <div
              className="flex flex-wrap -mx-3 mb-6">
              <div
                className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3 mb-2"
                       htmlFor="grid-pseudo">
                  Pseudo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-pseudo"
                  type="text"
                  value={loggedUser.pseudo}
                  onChange={(e) => setPseudoReg(e.target.value)}/>
                  { state.pseudo == "Validation len on pseudo failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez renseigner un pseudo valide de plus 3 caractères" }
                  </p>}
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-6 mb-2"
                  htmlFor="grid-pseudo">
                  Adresse email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="email"
                  value={loggedUser.email}
                  onChange={(e) => setMailReg(e.target.value)} 
                  disabled
                  />
                  { state.email == "Validation isEmail on email failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez renseigner un email valide" }
                  </p>}
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-6 mb-2"
                       htmlFor="grid-password">
                  Changement de mot de passe
                </label>
                <input
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="***********"
                  onChange={(e) => setPwdReg(e.target.value)}/>
                  { state?.password == "Validation len on password failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez renseigner un mot de passe de plus de 8 caractères" }
                  </p>}
              </div>
            </div>
            <div
              className="flex flex-wrap -mx-3 mb-6">
              <div
                className="w-full md:w-1/2 px-3 mb-6 md:mb-0x">
                <label
                  className="block uppercase mb-4 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-techList">
                  Choisis tes technos préférées
                </label>
                <div className="grid grid-rows-{n} auto-cols-max">

                <MultiSelectFilter
            className={"text-xs w-full"}
            items={fromObjectListToSelectOptions(TECH_LIST)}
            selected={techChecked}
            setSelected={techChecked}
            placeholder={"Technologies"}
          />
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap -mx-3 mb-6">
              <div
                className="w-full md:w-1/2 px-3 mb-6 md:mb-0x">
                <label
                  className="block uppercase mb-4 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-techList">
                  Choisis ta filière
                </label>
                  
                <div className="grid grid-flow-col grid-col-rows auto-cols-max">
                  <select defaultValue={"Filière"} onChange={handleCheckStudy}>
                    <option> {loggedUser.studyList} </option>
                  {Object.keys(STUDY_LIST).map((item, index) => (
                    <option key={index} valule={STUDY_LIST[item]}>
                      {STUDY_LIST[item]}
                    </option>
                  ))}
                  </select>
                  
                </div>
              </div>
            </div>


            <div
              className="flex flex-wrap -mx-3 mb-6">
                <label
                  className="block uppercase mb-4 text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-techList">
                  Changer photo de profil
                </label>
              <div
                className="w-full md:w-1/2 px-3 mb-6 md:mb-0x">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 w-16">
                    <input className=" "
                    type="radio" name="photo" id="1" onChange={(e) => setPicture(e.target.id)} />
                    <label htmlFor="1">
                      <img className="rounded-full w-16 h-16 bg-cover bg-center" src="/images/1.png"/>
                    </label>
                  </div>
                  <div className="h-16 w-16">
                  <input className=" "
                    type="radio" name="photo" id="2" onChange={(e) => setPicture(e.target.id)} />
                  <label htmlFor="2">
                      <img className="rounded-full w-16 h-16 bg-cover bg-center" src="/images/2.png"/>
                    </label>
                  </div>
                  <div className="h-16 w-16">
                  <input className=" "
                    type="radio" name="photo" id="3" onChange={(e) => setPicture(e.target.id)} />
                  <label htmlFor="3">
                      <img className="rounded-full w-16 h-16 bg-cover bg-center" src="/images/3.png"/>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap content-center -mx-3 mb-6">
              
              
              <button
                type="submit"
                onClick={regForm}
                className="inline-block mx-3 px-7 py-3 bg-purple-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Sauvegarder les changements
              </button>
              
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
        