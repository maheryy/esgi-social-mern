import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'

function MessagesList() {

    const [messages, setMessages] = useState(false)

    useEffect(() => { fetchMessages() }, [])

    const fetchMessages = async () => {
        const response = await fetch('https://retoolapi.dev/l71nC7/data')
        const data = await response.json()
        setMessages(data)
    }

    return (
        <div>
            <div class="text-left overflow-x-auto relative mx-5 my-5">
                <h2 class="font-bold">Liste des messages à traiter</h2>
            </div>
            <div>
                { messages.length > 0 && <ListComponent messages={ messages } /> }
                { messages.length == 0 && <p>Aucune donnée trouvée</p> }
                { !messages && <ArrayLoader /> }
            </div>
        </div>
    )
}

export default MessagesList