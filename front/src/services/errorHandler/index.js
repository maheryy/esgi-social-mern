import { API_URL } from "../constants";

export const handleError = (error) => {
    fetch(`${API_URL}/client-errors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: error.name,
            message: error.message,
            stack: error.stack,
        }),
    }).then((res) => {
        console.log(res);
    });
}