import React from "react"
import { 
    useState,
    useEffect,
} from "react";

const AlertMessages = ( response ) => {
    const [showAlert, setShowAlert] = useState(false);
    const [color, setColor] = useState("false");
    const [message, setMessage] = useState(false);

    useEffect(() => {
        if(response.response === 200) {
            setColor("indigo")
            setMessage("Utilisateur modifié avec succès")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }
            , 3000)
        }
        if(response.response === 400) {
            setColor("rose")
            setMessage("Erreur lors de la modification de l'utilisateur")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }
            , 3000)
        }
        if(response.response === 404) {
            setColor("rose")
            setMessage("Utilisateur introuvable")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }
            , 3000)
        }
        if(response.response === 500) {
            setColor("rose")
            setMessage("Erreur lors de la modification de l'utilisateur")
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }
            , 3000)
        }
    }, [response])

    return (
        <>
            { showAlert ? (
                <div
                className={
                    "px-6 py-4 border-0 rounded relative mb-4 bg-"+color+"-500"
                }
                >
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell" />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        <b>{message}</b>
                    </span>
                </div>
            ) : null}
        </>
    );
};

export default AlertMessages