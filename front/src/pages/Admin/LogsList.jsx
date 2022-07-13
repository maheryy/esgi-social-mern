import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'

function LogsList() {

    const [logs, setLogs] = useState([])

    useEffect(() => { fetchLogs() }, [])

    const fetchLogs = async () => {
        const response = await fetch('https://retoolapi.dev/eBGTJM/data')
        const data = await response.json()
        setLogs(data)
    }

    return (
        <div>
            <h2>Liste des logs</h2>
            <div>
                <ListComponent logs={ logs } />
            </div>
        </div>
    )
}

export default LogsList