import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../../services/constants/index.js";
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import ArrayLoader from '../ArrayLoader'

function UserForm( { response, setResponse } ) {

    const params = useParams();
    const [user, setUser] = useState()

    useEffect(() => { fetchUser() }, [])

    const fetchUser = useCallback(() => {
        fetch(`${API_URL}/users/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
            setUser(res)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [])

    if(!user) {
        return <div><ArrayLoader/></div>
    }

    return (
        <div>
        <Formik
            initialValues={{ email: user.email, password: user.password, firstname: user.firstname, status: user.status }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                fetch(`${API_URL}/users/${params.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
                .then((res) => {
                    res.json()
                    setResponse(res.status)
                })
                .then((res) => {
                    setSubmitting(false);
                    //window.location.reload()
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    setSubmitting(false);
                }
                )
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="firstname">
                            Prénom
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            type="text"
                            name="firstname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
                        />
                        {errors.email && touched.email && errors.email}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="email">
                            Mail
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                        {errors.email && touched.email && errors.email}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                            Mot de passe
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                        {errors.password && touched.password && errors.password}
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="status">
                            Statut
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <select
                            name="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        >
                            <option value="">Choisir un statut</option>
                            <option value="suspended">Suspendu</option>
                            <option value="active">Actif</option>
                            <option value="banned">Banni</option>
                        </select>
                        {errors.password && touched.password && errors.password}
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Modifier
                </button>
            </form>
            )}
        </Formik>
    </div>
    )
}

export default UserForm