import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../../services/constants/index.js";
import { Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
    TECH_LIST,
    STUDY_LIST,
    STATUS_REJECTED,
    STATUS_CANCELLED,
    STATUS_DELETED,
    STATUS_DEFAULT,
    STATUS_ACTIVE,
    STATUS_HOLD,
    STATUS_ACCEPTED
} from '../../../../services/constants/index.js';

function CreateForm() {

    const navigate = useNavigate();

    const createLabel = () => {
        let array = []
        for (const property in TECH_LIST) {
            array.push(
                <label>
                    <Field type="checkbox" name="techList" value={ property } />
                    { TECH_LIST[property] }
                </label>
            )
        }
        return array
    }

    const createStudyLabel = () => {
        let array = []
        for (const property in STUDY_LIST) {
            array.push(
                <option value={ property }>{ STUDY_LIST[property] }</option>
            )
        }
        return array
    }

    return (
        <div>
            <Formik
                initialValues={{ pseudo: '', email: '', password: '', firstname: '', status: '' , techList: '' , studyList: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    values.techList = values.techList.join()
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pseudo">
                                    Pseudo
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="pseudo"
                                    name="pseudo"
                                    type="text"
                                    placeholder="Pseudo"
                                    value={values.pseudo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.pseudo && touched.pseudo && (
                                    <div className="text-red-500 text-xs italic">{errors.pseudo}</div>
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
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="techList">
                                    Liste des technos
                                </label>
                                { createLabel() }
                            </div>
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="studyList">
                                    Filiaire d'études
                                </label>
                                <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="studyList"
                                    name="studyList"
                                    value={values.studyList}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    { createStudyLabel() }
                                </select>
                                {errors.studyList && touched.studyList && (
                                    <div className="text-red-500 text-xs italic">{errors.studyList}</div>
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
                                    <option value={ STATUS_HOLD }>En suspend</option>
                                    <option value={ STATUS_ACTIVE }>Actif</option>
                                    <option value={ STATUS_CANCELLED }>Bannir</option>
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