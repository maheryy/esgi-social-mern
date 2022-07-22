import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../services/constants/index.js";
import { useParams } from 'react-router-dom';
import MessageForm from './forms/MessageForm.jsx';

function MessageEdit() {

    const params = useParams();
    const [message, setMessage] = useState()

    useEffect(() => { fetchMessage() }, [])

    const fetchMessage = useCallback(() => {
        fetch(`${API_URL}/messages/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
            setMessage(res)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <>
            <div>
                <div class="text-left overflow-x-auto relative mx-5 my-5">
                    <h2 class="font-bold">Message à traiter</h2>
                    <MessageForm/>
                </div>
            </div>
        </>
    )
}

export default MessageEdit