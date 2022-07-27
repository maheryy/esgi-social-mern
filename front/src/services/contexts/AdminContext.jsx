import {useReducer, useState, useEffect, createContext} from "react";
import {useAuthContext} from "../hooks";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../constants";
import eventReducer, {EventActions, store} from "../reducers/event";

export const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [event, dispatchEvent] = useReducer(eventReducer, store);

    const {loggedUser} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedUser || !loggedUser.isAdmin) {
            navigate("/login", {replace: true});
        }
        const es = new EventSource(`${API_URL}/sse`);
        es.addEventListener("dashboard", onDashboardUpdate);
        es.onerror = (error) => {
            console.error(error);
        };

        return () => {
            es.removeEventListener("dashboard", onDashboardUpdate);
            es.close();
        };
    }, []);

    const onDashboardUpdate = (e) => {
        const data = JSON.parse(e.data);

        dispatchEvent({type: EventActions.ADMIN_DASHBOARD_UPDATE});
    };
    return (
        <AdminContext.Provider
            value={{
                event
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
