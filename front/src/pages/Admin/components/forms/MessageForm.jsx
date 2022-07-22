import {
    useState,
    useEffect,
    useCallback,
    } from 'react';
import { API_URL } from "../../../../services/constants/index.js";
import { useParams } from 'react-router-dom';
import ArrayLoader from '../ArrayLoader'
import { Field, Formik } from 'formik';

function MessageForm() {

    const params = useParams();
    const [message, setMessage] = useState()
    const [response, setResponse] = useState()

    useEffect(() => { fetchMessage() }, [])

    const fetchMessage = useCallback(() => {
        fetch(`${API_URL}/messages/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
            setMessage(res)
        })
        .catch((error) => {
            console.error(error);
        })
    }, [])

    if(!message) {
        return <div><ArrayLoader/></div>
    }

    return (
        <>
            <div>
                <Formik
                    initialValues={{ content: message.content, isModerated: message.isModerated }}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        fetch(`${API_URL}/messages/${params.id}`, {
                            method: 'PUT',
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
                            navigate("/admin/messages-list");
                        }
                        )
                    }
                }
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
                            <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Message :</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{ message.content }</p>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="lex items-center mb-4">
                                    <div id="my-radio-group">Modération</div>
                                    <div role="group" aria-labelledby="my-radio-group">
                                        <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Signaler
                                        <Field type="radio" name="isModerated" value="true" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        </label>
                                        <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        <Field type="radio" name="isModerated" value="false" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        Passer
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Valider la plainte
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default MessageForm