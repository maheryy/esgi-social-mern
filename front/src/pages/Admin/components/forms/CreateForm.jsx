import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../../services/constants/index.js";
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

function CreateForm() {

    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '', firstname: '', lastname: '', status: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    fetch(`${API_URL}/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    })
                    .then((res) => {
                        res.json()
                    }).catch((error) => {
                        console.error(error);
                    }).finally(() => {
                        setSubmitting(false);
                        navigate("/admin/users-list");
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
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-xs italic">{errors.email}</div>
                                )}
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Mot de passe
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-xs italic">{errors.password}</div>
                                )}
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstname">
                                    Prénom
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    placeholder="Prénom"
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.firstname && touched.firstname && (
                                    <div className="text-red-500 text-xs italic">{errors.firstname}</div>
                                )}
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastname">
                                    Nom
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Nom"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.lastname && touched.lastname && (
                                    <div className="text-red-500 text-xs italic">{errors.lastname}</div>
                                )}
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Choisir un statut</option>
                                    <option value="active">Actif</option>
                                    <option value="banned">Banni</option>
                                </select>
                                {errors.status && touched.status && (
                                    <div className="text-red-500 text-xs italic">{errors.status}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default CreateForm