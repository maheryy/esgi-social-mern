import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";

function AdminScreen() {

    return (
        <div>
            <h2>Hello admin</h2>
            <div>
                <Link to="/admin/test">Test</Link>
            </div>
        </div>
    )
}

export default AdminScreen