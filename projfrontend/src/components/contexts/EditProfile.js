import React ,{useContext,useState , useEffect} from 'react'; 
import detailsContext from './context'; 
import emailjs from "emailjs-com"; 
import NavBar from './Navbar';
import { Navigate } from "react-router-dom";

import '../css/editprofile.css';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

emailjs.init('JAWTb9rtcQjUNLTQj') 
 
const Editprofile = () => { 
    const [saved , setSaved] = useState(false)
    const {val,dispatch}=useContext(detailsContext); 
    const [details, setDetails] = useState({ 
        name: val.name, 
        email: val.email, 
        college: val.college, 
        role:val.role, 
        district: val.district,
        state: val.state,
        regdno: val.regdno
    }) 
    
    const {name , email , college , role , state , district, regdno} = details;

    useEffect( () => {
        if(details.name==="" && details.email === ""){
            setDetails(JSON.parse(localStorage.getItem("user")));
            console.log("user", JSON.parse(localStorage.getItem("user")) );
            console.log("Came here inside");
        
        }
        console.log("Came here");
    } , [])

    const token = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    
    const body = {
                name: name, 
                email: email,
                college:college , 
                state:state,
                district:district,
                regdno:regdno
    };

    
    const saveChanges = async () => {
        await axios.put(
            `http://localhost:8000/api/${localStorage.getItem("id")}`,
            
                body , token
            )
            .then(
                res =>( 
                    console.log("res-data",res.data),
                    dispatch(res.data),
                    console.log("val" , val),
                    console.log(localStorage.getItem("user")),
                    localStorage.setItem("user" , JSON.stringify(res.data)),
                    setSaved(true),
                    toast.success("Sucessfully updated the profile", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        delay: 1000
                      })
                )
                
            ).catch(err => console.log(err) )

    }

   if(saved) {
    return <Navigate to="/profile"/>
   }

    return( 
        <div>
            <NavBar/>

        <div className="eProfile"> 

            Name: 
            <input type='text' name='editname' id = 'editname' placeholder='Enter valid name' 
            onChange={e => setDetails({...details, name:e.target.value})} 
            value={details.name} 
            /><br /> 

            Email: 
            <input type='text' name='editemail' id = 'editemail' placeholder='Enter valid email' 
            onChange={e => setDetails({...details, email:e.target.value})} 
            value={details.email} 
            disabled
            /> 
            {localStorage.getItem("role")==="0"?"Regd no":""}
            
            <br /> 
            {
                localStorage.getItem("role") === "0"?(
                    <input type='text' name='editemail' id = 'editemail' placeholder='Enter valid email' 
                    onChange={e => setDetails({...details, regdno:e.target.value})} 
                    value={details.regdno} />
                ):""

            }
            College
            <input  
            type="text" 
            name="clgname" 
            id="clgname" 
            placeholder="Enter Your college name" 
            onChange={e => setDetails({...details,college:e.target.value})} 
            value={details.college} 
            /><br /> 
            
            State:
            <input  
            type="text" 
            name="clgname" 
            id="clgname" 
            placeholder="Enter Your state" 
            onChange={e => setDetails({...details,state:e.target.value})} 
            value={details.state} 
            /><br />

            District:
            <input  
            type="text" 
            name="clgname" 
            id="clgname" 
            placeholder="Enter Your district" 
            onChange={e => setDetails({...details,district:e.target.value})} 
            value={details.district} 
            /><br />

            <button type="submit" onClick = {saveChanges}>Save Changes</button>
            
        </div> 
    </div>
    
    ) 
 
}; 
 
export default Editprofile;