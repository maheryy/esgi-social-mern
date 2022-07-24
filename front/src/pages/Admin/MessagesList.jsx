import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'
import { API_URL } from "../../services/constants/index.js";
import { useCallback } from 'react';

function MessagesList() {

    const [messages, setMessages] = useState(false)

    useEffect(() => { fetchMessages() }, [])

    const fetchMessages = useCallback(() => {
        fetch(`${API_URL}/messages`)
        .then((res) => res.json())
        .then((res) => {
            setMessages(res)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <div>
            <div className="text-left overflow-x-auto relative mx-5 my-5">
                <h1 className="font-bold text-xl">Liste des messages à traiter</h1>
            </div>
            <div className="ml-5">
                { messages.length > 0 && <ListComponent messages={ messages } /> }
                { messages.length == 0 && <p>Aucune donnée trouvée</p> }
                { !messages && <ArrayLoader /> }
            </div>
        </div>
    )
}

export default MessagesList