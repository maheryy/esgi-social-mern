import {
    useState,
    useEffect,
    useCallback,
    } from 'react'
import { API_URL } from "../../../services/constants";
import { useParams } from 'react-router-dom';
import UserForm from './forms/UserForm'
// INSERT INTO users VALUES ('3', 'test@gmail.com', 'password', 'false', 'calvin', '2008-11-11 13:23:44', '2008-11-11 13:23:44', 'Intha', 'active')
function UserEdit() {

    const params = useParams();
    const [user, setUser] = useState()

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
        <div>
            <div class="text-left overflow-x-auto relative mx-5 my-5">
                <h2 class="font-bold">Profil de l'utilisateurs</h2>
                <UserForm/>
            </div>
        </div>
    )
}

export default UserEdit