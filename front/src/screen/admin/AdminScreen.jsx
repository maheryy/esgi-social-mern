import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    Link
} from "react-router-dom";
import Sidebar from './components/sidebar/sidebar';

function AdminScreen() {

    return (
        <div>
            <Sidebar/>
        </div>
    )
}

export default AdminScreen