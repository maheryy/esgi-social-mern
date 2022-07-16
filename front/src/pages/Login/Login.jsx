export const Login = () => {
  return (
    <>
      <h1 className="text-center text-purple-400 text-5xl">Hi Raida</h1>
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
      <h1 className="text-center text-purple-400 text-5xl">Connexion</h1>
      </div>
        <form>
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Adresse Mail"
            />
          </div>

          {/* <!-- Password input --> */}
          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Mot de passe"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            
            <a
              href="#!"
              className="text-purple-600 hover:text-purple-700 focus:text-purple-700 active:text-purple-800 duration-200 transition ease-in-out"
              >Mot de passe oublié ? </a
            >
            
          </div>
          
          {/* <!-- Submit button --> */}
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
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
