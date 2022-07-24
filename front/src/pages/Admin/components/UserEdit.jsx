import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../services/constants/index.js";
import { useParams } from 'react-router-dom';
import UserForm from './forms/UserForm'
import AlertMessages from './AlertMessages.jsx';

function UserEdit() {

    const params = useParams();
    const [user, setUser] = useState()
    const [response, setResponse] = useState()

    useEffect(() => { fetchUser() }, [])

    const fetchUser = useCallback(() => {
        fetch(`${API_URL}/users/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
            setUser(res)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <>
            <div>
                <div className="text-left overflow-x-auto relative mx-5 my-5">
                    <h2 className="font-bold">Profil de l'utilisateurs</h2>
                    <AlertMessages response={ response }/>
                    <UserForm response={ response } setResponse={ setResponse }/>
                </div>
            </div>
        </>
    )
}

export default UserEdit