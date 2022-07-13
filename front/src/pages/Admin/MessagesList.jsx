import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'

function MessagesList() {

    const [messages, setMessages] = useState([])

    useEffect(() => { fetchMessages() }, [])

    const fetchMessages = async () => {
        const response = await fetch('https://retoolapi.dev/l71nC7/data')
        const data = await response.json()
        setMessages(data)
    }

    return (
        <div>
            <h2>Liste des messages à traiter</h2>
            <div>
                <ListComponent messages={ messages } />
            </div>
        </div>
    )
}

export default MessagesList