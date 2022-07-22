import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'
import { API_URL } from "../../services/constants/index.js";
import { useCallback } from 'react';

function UsersList() {

    const [users, setUsers] = useState(false)

    useEffect(() => { fetchUsers() }, [])

    const fetchUsers = useCallback(() => {
        fetch(`${API_URL}/users`)
        .then((res) => res.json())
        .then((res) => {
            setUsers(res)
        })
        .catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <div>
            <div class="text-left overflow-x-auto relative mx-5 my-5">
                <h1 class="font-bold text-xl">Liste des utilisateurs</h1>
            </div>
            <div class="flex justify-start">
                <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-5">
                    <a href="/admin/users-list/add">Ajouter un utilisateur</a>
                </button>
            </div>
            <div class="ml-5 my-3">
                { users.length > 0 && <ListComponent users={ users } /> }
                { users.length == 0 && <p>Aucune donnée trouvée</p> }
                { !users && <ArrayLoader /> }
            </div>
        </div>
    )
}

export default UsersList