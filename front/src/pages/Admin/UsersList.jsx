import { useState, useEffect } from 'react'
import ListComponent from './components/ListComponent'

function UsersList() {

    const [users, setUsers] = useState([])

    useEffect(() => { fetchUsers() }, [])

    const fetchUsers = async () => {
        const response = await fetch('https://retoolapi.dev/KJRvhs/data')
        const data = await response.json()
        setUsers(data)
    }

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <div>
                <ListComponent users={ users } />
            </div>
        </div>
    )
}

export default UsersList