import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    Link
} from "react-router-dom";

function Sidebar() {

    return (
        <div style={{ display: "flex" }}>
            <div
            style={{
                height: "100vh",
                padding: "10px",
                width: "20%",
                background: "#f0f0f0"
            }}
            >
            <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                <Link to="dashboard">Dashboard</Link>
                </li>
                <li>
                <Link to="users">Users</Link>
                </li>
                <li>
                <Link to="messages">Messages</Link>
                </li>
                <Outlet />
            </ul>
            </div>
        </div>
    )
}

export default Sidebar