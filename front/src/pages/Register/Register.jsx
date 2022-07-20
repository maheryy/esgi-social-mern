import { API_URL, TECH_LIST } from "../../services/constants";

console.log(TECH_LIST);
export const Register = () => {
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
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Prenom
        </label>
        <input className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Yves"/>
        {/* <p className="text-red-500 text-xs italic">Veuillez remplir ce champs s'il vous plaît.</p> */}
        </div>
        <div className="w-full md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Nom
        </label>
        <input className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Skrzypczyk"/>
        </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-pseudo">
        Pseudo
        </label>
        <input className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-pseudo" type="text" placeholder="pseudo"/>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-6 mb-2" htmlFor="grid-pseudo">
        Adresse email
        </label>
        <input className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder=""/>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-6 mb-2" htmlFor="grid-password">
        Mot de passe
        </label>
        <input className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
        {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
        </div>
        </div> 
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0x">
            <label className="block uppercase mb-4 text-gray-700 text-xs font-bold mb-2" htmlFor="grid-techList">
            Choisis tes technos préférées
            </label>
            <div class="grid grid-flow-col grid-col-rows auto-cols-max">
                <div class="flex items-center mr-4 pl-4 rounded border border-purple-200 ">
                    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-purple-600 bg-purple-100 rounded border-gray-300 focus:ring-purple-500"/>
                    <label for="bordered-checkbox-1" class="py-4 ml-2 mr-2 w-3/5 text-sm font-medium text-gray-900 ">React</label>
                </div>
                <div class="flex items-center mr-4 pl-4 rounded border border-purple-200 ">
                    <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-purple-600 bg-purple-100 rounded border-gray-300 focus:ring-purple-500"/>
                    <label for="bordered-checkbox-2" class="py-4 ml-2 mr-2 w-3/5 text-sm font-medium text-gray-900 ">Node</label>
                </div>
                <div class="flex items-center mr-4 pl-4 rounded border border-purple-200 ">
                    <input id="bordered-checkbox-3" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-purple-600 bg-purple-100 rounded border-gray-300 focus:ring-purple-500"/>
                    <label for="bordered-checkbox-3" class="py-4 ml-2 mr-2 w-3/5 text-sm font-medium text-gray-900 ">Python</label>
                </div>
                <div class="flex items-center mr-4 pl-4 rounded border border-purple-200 ">
                    <input id="bordered-checkbox-4" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-purple-600 bg-purple-100 rounded border-gray-300 focus:ring-purple-500"/>
                    <label for="bordered-checkbox-4" class="py-4 ml-2 mr-2 w-3/5 text-sm font-medium text-gray-900 ">PHP</label>
                </div>
            </div>
                
                </div>
            </div>

        <div className="flex flex-wrap content-center -mx-3 mb-6">
        <button
        type="submit"
        className="inline-block mx-3 px-7 py-3 bg-purple-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
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
    