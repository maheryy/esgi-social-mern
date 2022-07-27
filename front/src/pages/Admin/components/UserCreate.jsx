import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../services/constants/index.js";
import { useParams } from 'react-router-dom';
import CreateForm from './forms/CreateForm'
import AlertMessages from './AlertMessages.jsx';

function UserCreate() {

    const [response, setResponse] = useState()

    return (
        <>
            <div>
                <div className="text-left overflow-x-auto relative mx-5 my-5">
                    <h2 className="font-bold">Ajouter un utilisateur</h2>
                    <AlertMessages response={ response }/>
                    <CreateForm/>
                </div>
            </div>
        </>
    )
}

export default UserCreate