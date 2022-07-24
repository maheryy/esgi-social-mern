import { useState, useEffect, useCallback } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'
import { API_URL } from "../../services/constants/index.js";

function LogsList() {

    const [logs, setLogs] = useState(false)

    useEffect(() => { fetchLogs() }, [])

    const fetchLogs = useCallback(() => {
        fetch(`${API_URL}/access-logs?perPage=100`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setLogs(res)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <div>
            <div className="text-left overflow-x-auto relative mx-5 my-5">
                <h2 className="font-bold">Liste des logs</h2>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Status code</th>
                            <th>URL</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 &&
                            logs.map((log) => {
                                return (
                                    <tr>
                                        <td>{log._id}</td>
                                        <td>{log.timestamp}</td>
                                        <td>{log.req.method}</td>
                                        <td>{log.res.statusCode}</td>
                                        <td>{log.req.url}</td>
                                        <td>{log.req?.body ? JSON.stringify(log.req.body, null, 2) :''}</td>
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