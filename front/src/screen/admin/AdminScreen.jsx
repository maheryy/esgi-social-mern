import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    Link
} from "react-router-dom";

function AdminScreen() {

    return (
        <div>
            <h2>Hello ADMIN</h2>
            <div>
                <Link to="dashboard">Dashboard</Link>
                <Link to="users">Users</Link>
                <Link to="messages">Messages</Link>

                <Outlet />
            </div>
        </div>
    )
}

export default AdminScreen