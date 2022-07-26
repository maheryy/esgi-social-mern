import { API_URL, STUDY_LIST, TECH_LIST } from "../../services/constants";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiSelectFilter from "../../components/MultiSelectFilter";
import { fromObjectListToSelectOptions } from "../../services/helpers";

export const Register = () => {

  const [firstname, setFirstnameReg] = useState("");
  const [pseudo, setPseudoReg] = useState("");
  const [mail, setMailReg] = useState("");
  const [pwd, setPwdReg] = useState("");
  const [techChecked, setTechReg] = useState([]);
  const [studyChecked, setStudyReg] = useState("");
  const [state, setState] = useState("");
  const [response, setResponse] = useState("");


  
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
        techList: techChecked.join(", "),
        studyList: studyChecked,
      };

      const res = await fetch(`${API_URL}/users`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      const data = await res.json();

      setResponse(res)
      setState(data);

    } catch (err) {
      console.log(err);
    }
  };

  


  return (
    <>
      {/* <h1 className="text-center text-cyan-400 text-5xl">Register</h1> */}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">
              Logo
            </h3>
          </a>

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
                  placeholder="firstname"
                  onChange={(e) => setFirstnameReg(e.target.value)}/>
                  { state?.firstname == "Validation len on firstname failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez saisir un prenom valide de plus de 3 caracteres" }
                  </p>}
                {/* <p className="text-red-500 text-xs italic">Veuillez remplir ce champs s'il vous plaît.</p> */}
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
                  placeholder="pseudo"
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
                  placeholder=""
                  onChange={(e) => setMailReg(e.target.value)}/>
                  { state.email == "Validation isEmail on email failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez renseigner un email valide" }
                  </p>}
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-6 mb-2"
                       htmlFor="grid-password">
                  Mot de passe
                </label>
                <input
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => setPwdReg(e.target.value)}/>
                  { state?.password == "Validation len on password failed" &&
                  <p className="text-red-500 text-xs italic"> 
                    { "Veuillez renseigner un mot de passe de plus de 8 caractères" }
                  </p>}
                {/* <p className="text-gray-600 text-xs italic">  */}
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
            setSelected={setTechReg}
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
                    <option> Filière </option>
                  {Object.keys(STUDY_LIST).map((item, index) => (
                    <option key={index} valule={STUDY_LIST[item]}>
                      {STUDY_LIST[item]}
                    </option>
                  ))}
                  </select>
                  
                </div>
              </div>
            </div>

            <div className="flex flex-wrap content-center -mx-3 mb-6">
              
              { response?.status == 201 &&
                  <p className="text-green-500 text-lg italic mx-4 mb-3" > 
                    {"Inscrit avec succès"}
                  </p>}
                  { response?.status != 201 && response!= "" &&
                  <p className="text-red-500 text-lg bold italic mx-4 mb-3" > 
                    {"Assurez-vous que tout les champs soient correctement remplis svp"}
                  </p>}
              <button
                type="submit"
                onClick={regForm}
                className="inline-block mx-3 px-7 py-3 bg-purple-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                S'inscrire
              </button>
              
              <p className="text-sm font-semibold mx-3 mt-2 pt-1 mb-0">
                Vous avez déjà un compte ?
                <a
                  href="/login"
                  className="text-pink-500 hover:text-pink-700 focus:text-pink-700 transition duration-200 ease-in-out"
                > Connectez-vous</a
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
        