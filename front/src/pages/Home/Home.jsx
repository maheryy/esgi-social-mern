import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <div className="h-screen bg-indigo-900">
            <div className="w-screen bg-indigo-900">
                <header>
                    <nav className="h-16 flex flex-row items-center justify-between pr-4 pl-4 justify-end">
                        <h1 className="text-5xl font-extrabold text-white hidden md:block">10Cordes</h1>
                        <div className="flex flex-row w-full justify-end">
                            <Link to={'/register'}
                                  className="text-white h-12 text-xl p-6 bg-zinc-800 flex justify-center items-center rounded-full mr-6">Sign
                                up</Link>
                            <Link to={'/login'}
                                  className="text-zinc h-12 text-xl p-6 bg-gray-50 flex justify-center items-center rounded-full">Login</Link>
                        </div>
                    </nav>
                </header>
                <main className="flex h-full w-full flex flex-col items-center">
                    <h1 className="text-5xl font-extrabold text-white mt-10 md:hidden">10Cordes</h1>
                    <div className="container mt-24 flex flex-col md:flex-row">
                        <img src="/images/home-illustration.svg" className="h-96"/>
                        <div
                            className="flex flex-col justify-center max-w-xl items-center md:mt-0 md:ml-10 rounded-2xl bg-white p-3 md:p-16 mb-16 md:mb-0 m-4 md:m-0">
                            <h2 className="text-3xl font-extrabold text-center text-zinc">Welcome to 10Cordes</h2>
                            <p className="text-zinc text-lg text-center pt-6">
                                A platform where you can chat with friends, talk about technology, and share your
                                knowledge.
                            </p>
                            <p className="text-zinc text-lg text-center pt-6">
                                Find people with similar interests and get to know each other.
                            </p>
                            <Link to={'/register'}
                                  className="text-white h-12 text-xl p-6 bg-zinc-800 flex justify-center items-center rounded-full mt-8 animate-bounce cursor-pointer">Sign
                                up</Link>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};
