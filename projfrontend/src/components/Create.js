import React,{useState , useEffect} from "react"; 
import axios from 'axios'; 
import { Navigate } from "react-router-dom";
import NavBar from './contexts/Navbar.js';
import "./css/create.css"
import moment from "moment"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Create = () => { 



    const [role , setRole ] = useState(0)
    const [success , setSuccess] = useState(false)

    const [details, setDetails] = useState({ 
        name: "", 
        info: "", 
        amount : 0, 
        seats: 0, 
        accno: "", 
        IFSC : "", 
        fromDate:"", 
        toDate:"", 
        fromTime:"", 
        toTime:"", 
        instructor:""
    }) 

    


    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name, info, amount , seats ,accno , fromDate, toDate ,IFSC, fromTime , toTime , instructor} = details;

        const token = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        const body = {
            name: name,
            info: info,
            amount: amount,
            seats: seats,
            accno: accno,
            IFSC: IFSC,
            fromDate: fromDate,
            toDate: toDate,
            fromTime: fromTime,
            toTime: toTime,
            instructor: instructor,
            imgNo:Math.floor( (Math.random() * 24) + 1 )
        };

        await axios.post(
            `http://localhost:8000/api/workshop/create/${localStorage.getItem("id")}`,
                body , token
          ).then(
              res => console.log(res.data),
              setSuccess(true)
          ).catch(
            err => {
              toast.error("Unable to create workshop", {
               position: toast.POSITION.BOTTOM_RIGHT
             });
           }
        )

    }

    useEffect( () => {
        setRole(localStorage.getItem("role"))
    } , [])

    if(role === "0") {
        console.log("Redirecting ....");

        return <Navigate to="/"/>
    }

    if(!localStorage.getItem("token"))
    return <Navigate to="/login"/>

    if(success)
        return <Navigate to="/myworkshops"/>;


        const disablePastDate = () => {
            const today = new Date();
            const dd = String(today.getDate() + 1).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            const yyyy = today.getFullYear();
            return yyyy + "-" + mm + "-" + dd;
        };

    return ( 
        <form onSubmit={handleSubmit}> 
            <NavBar/>
            <br /> 

            <div className="rcontainer">
            <br />
            <br />
            <br />

            <label for="email"><b>Name:</b></label>
            <input  
            type="text"  
            name="firstname"  
            id = "firstname"  
            placeholder="Enter workshop Name" 
            onChange={e => setDetails({...details, name:e.target.value})} 
            value={details.name} 
            required
            />

            
            <label for="email"><b>Enter info: </b></label>
            <input  
            type="text" 
            name="info" 
            id="info"  
            placeholder="Enter info related to workshop" 
            onChange={e => setDetails({...details,info:e.target.value})} 
            value={details.info} 
            required
            /><br /> 
 
             
            <label for="email"><b>amount: </b></label>
            <input  
            type="number" 
            name="amount" 
            id="amount"  
            placeholder="Enter amout" 
            onChange={e => setDetails({...details,amount:e.target.value})} 
            value={details.amount} 
            required
            /><br /> 
 
             
            <label for="email"><b>seats: </b></label>
            <input  
                type="number" 
                name="seats" 
                id="seats"  
                placeholder="Enter seats" 
                onChange={e => setDetails({...details,seats:e.target.value})} 
                value={details.seats} 
                required
            /><br /> 
 
             
            <label for="email"><b>accno: </b></label>
            <input  
                type="number" 
                name="accno" 
                id="accno"  
                placeholder="Enter accno" 
                onChange={e => setDetails({...details,accno:e.target.value})} 
                value={details.accno} 
                required
            /><br /> 
 
             
            <label for="email"><b>IFSC: </b></label>
            <input  
                type="text" 
                name="IFSC" 
                id="IFSC"  
                placeholder="Enter IFSC code" 
                onChange={e => setDetails({...details,IFSC:e.target.value})} 
                value={details.IFSC} 
                required
            /><br /> 
 
             
            <label for="email"><b>Fromdate: </b></label>
            <input  
                type="date" 
                name="date" 
                id="date"  
                min={disablePastDate()}
                placeholder="Enter start date of coduct" 
                onChange={e => setDetails({...details,fromDate:e.target.value})} 
                value={details.date} 
                required
            /><br /> 

            <label for="email"><b>Todate: </b></label>
            <input  
                type="date" 
                name="date" 
                id="date"  
                min={disablePastDate()}
                placeholder="Enter end date of coduct" 
                onChange={e => setDetails({...details,toDate:e.target.value})} 
                value={details.date} 
                required
            /><br /> 
 
             
            <label for="email"><b>FromTime: </b></label>
            <input  
                type="time" 
                name="fromTime" 
                id="fromTime"  
                placeholder="Enter from time" 
                onChange={e => setDetails({...details,fromTime:e.target.value})} 
                value={details.fromTime} 
                required
            /><br /> 
 
             
            <label for="email"><b>ToTime: </b></label>
            <input  
                type="time" 
                name="toTime" 
                id="toTime"  
                placeholder="Enter to time" 
                onChange={e => setDetails({...details,toTime:e.target.value})} 
                value={details.toTime} 
                required
            /><br /> 
 
             
            <label for="email"><b>instructor: </b></label>
            <input  
                type="text" 
                name="instructor" 
                id="instructor"  
                placeholder="Enter instructor name" 
                onChange={e => setDetails({...details,instructor:e.target.value})} 
                value={details.instructor} 
                required
            /> 

        <div className="clearfix">
            <button
                type="submit"
                className="btn">
                    Create    
            </button>
        </div>
            

            </div>
            
 
            
        </form> 
    ) 
 
} 
 
export default Create;