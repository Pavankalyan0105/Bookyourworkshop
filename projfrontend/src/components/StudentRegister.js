import React, { useState } from "react";
import axios from 'axios'
import Navbar from './contexts/Navbar'
import {Navigate} from 'react-router-dom';
import emailjs from "emailjs-com"; 
emailjs.init('JAWTb9rtcQjUNLTQj')


const StudentRegister = () => {
    const [onetp] = useState(JSON.stringify(Math.floor(Math.random() * 1000000)+1));
    const [details, setDetails] = useState({
        name: "",
        email: "",
        otp : "",
        password: "",
        college: "",
        regdno:"",
        state:"",
        district:""
    })
    const [Justtext,setJusttext] = useState("")
    const [Passtext,setPasstext] = useState("")
    const [success , setSucess] = useState(false)
    const [user , setUser] = useState({})
    const [err , setErr] = useState("")
   


    const SendOTP = () => {   
        console.log(onetp) 
        emailjs.send('service_p2fze8v', 'template_ik1nzc8', { 
            name:details.name, 
            otp:onetp, 
            email:details.email 
        },) 
          .then((result) => { 
              console.log(result.text); 
          }, (error) => { 
              console.log(error.text); 
          });        
    } 
    const validate = (e) => { 
        e.preventDefault() 
        console.log(onetp) 
        console.log(details.otp) 
        if(onetp===details.otp){ 
            console.log("TRUE") 
            return (true); 
        } 
        console.log("FALSE") 
        return (false); 
    } 
    const handleSubmit=(e) =>{ 
        e.preventDefault(); 
        SendOTP(); 
    }



    const handleClick = async (e) => {
            e.preventDefault();
            console.log("Clicked");
            if(Justtext !== "correct"){
                setErr("Plese recheck your details")
                return;
            } 
            console.log(details);

            const {name , email , password , college, regdno , state , district } = details;
            await axios.post(
                "http://localhost:8000/api/signup",
                {   name, 
                    email,
                    password , 
                    college , 
                    regdno ,
                    state,
                    district
                }
              ).then(
                  res =>( 
                      setSucess(true),
                      setUser(res.data.user)

                    )
           ).catch(
               err => console.log(err)
           )

    }

    if(success)
        return <Navigate to="/"/>
    
    return (
        <form
        style={{
            width:"50%",
            marginLeft:"24rem",
            border:"2px solid black",
            padding:"3rem"
        }}
        >
            <br />
            Enter Your name: 
            <input 
            type="text" 
            name="firstname" 
            id = "firstname" 
            placeholder="Enter First Name"
            onChange={e => setDetails({...details, name:e.target.value})}
            value={details.name}
            /><br />
            Enter your mail:
            <input 
            type="email"
            name="email"
            id="email" 
            placeholder="Enter your email"
            onChange={e => setDetails({...details,email:e.target.value})}
            value={details.email}
            />
            <button 
            type="submit"
            id="sendotp"
            onClick={e=>handleSubmit(e)}
            >Send Otp</button>
            <br/>
            Enter Otp
            <input 
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter your Otp"
            onChange={e=>setDetails({...details,otp:e.target.value})}
            value={details.otp}
            />
            <button type="submit" id="validateotp"
            onClick={
                e => {
                    (validate(e)) ? setJusttext("correct"):setJusttext("Wrong otp")
                }
                }
            >Verify
            </button>
                {Justtext}
            <br />
            Enter Password: 
            <input type="password" name="password" id="passwword"
            placeholder="Enter Password"
            onChange={e => setDetails({...details,password:e.target.value})}
            value={details.password}
            />
            <br/>
            Re-enter Password: 
            <input type="password" name="password" id="passwword"
            placeholder="Enter Password"
            onChange={
                e => {
                    (e.target.value === details.password) ? setPasstext(""):setPasstext("Password dont Match")
                }
            }

            /> {Passtext}
            <br/>
            Enter your college name:
            <input 
            type="text"
            name="clgname"
            id="clgname"
            placeholder="Enter Your college name"
            onChange={e => setDetails({...details,college:e.target.value})}
            value={details.college}
            
            />
            <br />
            Enter your Roll No:
            <input type="text" name="Rollno" id="Rollno" placeholder="Enter registration number"
                onChange={e => setDetails({...details,regdno:e.target.value})}
                value={details.regdno}
            />

            <br />
            Enter your State:
            <input type="text" name="state" id="state" placeholder="Enter state"
                onChange={e => setDetails({...details,state:e.target.value})}
                value={details.state}
            />

            <br />
            Enter your district:
            <input type="text" name="district" id="district" placeholder="Enter district"
                onChange={e => setDetails({...details,district:e.target.value})}
                value={details.district}
            />



            <button
                type="submit"
                onClick={e=>handleClick(e)}

            >
                Submit
            </button>

            {err}
        </form>
    )
}

export default StudentRegister;