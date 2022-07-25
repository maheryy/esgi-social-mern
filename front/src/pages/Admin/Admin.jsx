import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    Link
} from "react-router-dom";
import Sidebar from './Sidebar';
import { useAdminContext } from '../../services/hooks';



function Admin() {

    const { loggedUser, token } = useAdminContext();
  console.log("token: ", token);
  console.log("user: ", loggedUser);

    return (
        <div className="flex justify-start">
            <Sidebar/>
            <Outlet />
        </div>
    )
}

export default Admin
