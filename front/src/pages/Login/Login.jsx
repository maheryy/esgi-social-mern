import { API_URL, STUDY_LIST } from "../../services/constants";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/hooks";

export const Login = () => {

  const navigate = useNavigate();
  const { loggedUser, setLoggedUser, setToken } = useAuthContext();
  const [response, setResponse] = useState("");
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (!loggedUser) {
      return;
    }
    if (loggedUser.isAdmin) {
      navigate("/admin", { replace: true });
    } else {
      navigate("/friends", { replace: true });
    }
  }, []);

  const loginForm = async (e) => {
    e.preventDefault();
    try {

      const user = {
        email: mail,
        password: pwd,
      };

      const res = await fetch(`${API_URL}/security/login`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.token !== "" && res.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoggedUser(data.user);
        setToken(data.token);
        if (data.user.isAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/friends", { replace: true });
        }

      } else {
        setResponse(res);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw1.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div className="mb-6">
                <input
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Mot de passe"
                />
              </div>
              <form>
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    onChange={(e) => setMail(e.target.value)}
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Adresse email"
                  />
                </div>

              <div className="flex justify-between items-center mb-6">
                
              { response?.status == 401 &&
                  <p className="text-red-500 text-md italic mx-4" > 
                    {"Identifiant ou mot de passe incorrect"}
                  </p>}
                
              </div>
              
              <button
                type="submit"
                onClick={loginForm}
                className="inline-block px-7 py-3 bg-slate-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-800 hover:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Connexion
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Pas encore de compte ?
                  <a
                    href="/register"
                    class="text-pink-600 hover:text-pink-700 focus:text-pink-700 transition duration-200 ease-in-out"
                    > Inscrivez-vous</a
                  >
                </p>


              </form>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};
