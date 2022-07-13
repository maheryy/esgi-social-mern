import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'
import ArrayLoader from './components/ArrayLoader'

function UsersList() {

    const [users, setUsers] = useState(false)

    useEffect(() => { fetchUsers() }, [])

    const fetchUsers = async () => {
        const response = await fetch('https://retoolapi.dev/KJRvhs/data')
        const data = await response.json()
        setUsers(data)
    }

    return (
        <div>
            <div class="text-left overflow-x-auto relative mx-5 my-5">
                <h2 class="font-bold">Liste des utilisateurs</h2>
            </div>
            <div>
                { users.length > 0 && <ListComponent users={ users } /> }
                { users.length == 0 && <p>Aucune donnée trouvée</p> }
                { !users && <ArrayLoader /> }
            </div>
        </div>
    )
}

export default UsersList