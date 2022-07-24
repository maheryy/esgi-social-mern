import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    Link
} from "react-router-dom";
import Sidebar from './Sidebar';

function Admin() {

    return (
        <div className="flex justify-start">
            <Sidebar/>
            <Outlet />
        </div>
    )
}

export default Admin
