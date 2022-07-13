import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'

function LogsList() {

    const [logs, setLogs] = useState(false)

    useEffect(() => { fetchLogs() }, [])

    const fetchLogs = async () => {
        const response = await fetch('https://retoolapi.dev/eBGTJM/data')
        const data = await response.json()
        setLogs(data)
    }

    return (
        <div>
            <div class="text-left overflow-x-auto relative mx-5 my-5">
                <h2 class="font-bold">Liste des logs</h2>
            </div>
            <div>
                { logs.length > 0 && <ListComponent logs={ logs } /> }
                { logs.length == 0 && <p>Aucune donnée trouvée</p> }
                { !logs && <ArrayLoader /> }
            </div>
        </div>
    )
}

export default LogsList