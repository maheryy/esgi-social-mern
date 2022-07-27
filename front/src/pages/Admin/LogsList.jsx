import { useState, useEffect, useCallback } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'
import { API_URL } from "../../services/constants/index.js";

function LogsList() {

    const [logs, setLogs] = useState(false)
    const [clientErrors, setClientErrors] = useState(false)

    useEffect(() => { fetchLogs() }, [])
    useEffect(() => { fetchClientErrors() }, [])

    const fetchLogs = useCallback(() => {
        fetch(`${API_URL}/access-logs?perPage=20`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setLogs(res)
            })
            .catch((error) => {
                handleError(error);
                console.error(error);
            });
    }, [])
    const fetchClientErrors = useCallback(() => {
        fetch(`${API_URL}/client-errors?perPage=20`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setClientErrors(res)
            })
            .catch((error) => {
                handleError(error);
                console.error(error);
            });
    }, [])

    return (
        <div>
            <div className="text-left overflow-x-auto relative mx-5 my-5">
                <h2 className="font-bold">Liste des logs</h2>
            </div>
            <div className="text-left overflow-x-auto relative mx-5 my-5">
                <p>Logs API:</p>
                <table className='table-auto text-sm text-left'>
                    <thead className='text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white'>
                        <tr>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Method</th>
                            <th className="py-3 px-6">Status code</th>
                            <th className="py-3 px-6">URL</th>
                            <th className="py-3 px-6">Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 &&
                            logs.map((log) => {
                                return (
                                    <tr>
                                        <td className="border px-6 py-4">{log.timestamp}</td>
                                        <td className="border px-6 py-4">{log.req.method}</td>
                                        <td className="border px-6 py-4">{log.res.statusCode}</td>
                                        <td className="border px-6 py-4">{log.req.url}</td>
                                        <td className="border px-6 py-4">{log.req?.body ? JSON.stringify(log.req.body, null, 2) :''}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <p>Logs Client:</p>
                <table className='table-auto text-sm text-left'>
                    <thead className='text-xs uppercase bg-gray-50 dark:bg-gray-700 text-white'>
                        <tr>
                            <th className="py-3 px-6">Erreur</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Message</th>
                            <th className="py-3 px-6">Stack</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientErrors.length > 0 &&
                            clientErrors.map((log) => {
                                return (
                                    <tr>
                                        <td className="border px-6 py-4">{log._id}</td>
                                        <td className="border px-6 py-4">{log.timestamp}</td>
                                        <td className="border px-6 py-4">{log.message}</td>
                                        <td className="border px-6 py-4">{log.stack}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {logs.length == 0 && <p>Aucune donnée trouvée</p>}
                {!logs && <ArrayLoader />}


            </div>
        </div>
    )
}

export default LogsList