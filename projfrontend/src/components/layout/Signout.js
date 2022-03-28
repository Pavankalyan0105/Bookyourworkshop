import React  from "react";
import { Navigate } from "react-router-dom";


const Signout = () => {
    localStorage.removeItem(token);
    return <Navigate to="/login"/>
}

export default Signout;