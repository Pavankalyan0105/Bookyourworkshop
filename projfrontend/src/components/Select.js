import React,{ useState } from "react";
import { Link, Outlet , Navigate } from "react-router-dom";

const Select = () => {

    const [color , setColor] = useState({
        student:"#EEE8AA",
        faculty:"#EEE8AA"
    })

    const updateColor = (role) => {
        if(!role)
        setColor({
            faculty:"#0eb7f4",
            student:"#EEE8AA" 
        })
        else
        setColor({
            student:"#0eb7f4",
            faculty:"#EEE8AA" 
        })

        console.log(color);
    }

    // if( color.faculty === "#EEE8AA" && color.student === "#EEE8AA")
    //     return <Navigate to="/login"/>

    return(
    <div className="Select">
        <Link to="/components/Select/StudentRegister">
        <button 
        type="submit"
        id = "student"
        style={{
            backgroundColor: color.student,
            color:"black"

        }}
        onClick = { () => updateColor(1) }
        >Student </button>
        </Link>
        <Link to = "/components/Select/FacultyRegistration">
        <button
        type="submit"
        id = "faculty"
        style={{
            backgroundColor: color.faculty,
            color:"black"
        }}
        onClick = { () => updateColor(0) }
        >Faculty</button>
        </Link>
        <Outlet />
    </div>
    )
}
export default Select;