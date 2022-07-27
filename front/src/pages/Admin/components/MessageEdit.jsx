import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../services/constants/index.js";
import { useParams } from 'react-router-dom';
import MessageForm from './forms/MessageForm.jsx';
import { useAuthContext } from '../../../services/hooks/index.js';

function MessageEdit() {

    const params = useParams();
    const [message, setMessage] = useState()
    const { token } = useAuthContext();

    useEffect(() => { fetchMessage() }, [])

    const fetchMessage = useCallback(() => {
        fetch(`${API_URL}/messages/${params.id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setMessage(res)
        })
        .catch((error) => {
            handleError(error);
            console.error(error);
        });
    }, [])

    return (
        <>
            <div>
                <div className="text-left overflow-x-auto relative mx-5 my-5">
                    <h2 className="font-bold">Message à traiter</h2>
                    <MessageForm/>
                </div>
            </div>
        </>
    )
}

export default MessageEdit