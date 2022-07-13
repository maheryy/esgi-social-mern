import { useState } from 'react'
import ListComponent from './components/ListComponent'

function UsersList() {
    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <div class="w-screen">
                <ListComponent />
            </div>
        </div>
    )
}

export default UsersList