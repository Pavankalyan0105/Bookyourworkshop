import React, {useState, useContext, useEffect } from "react"; 
import detailsContext from "../contexts/context"
import NavBar from '../contexts/Navbar';
import {Link , Navigate} from 'react-router-dom'
import axios from 'axios';
const Profile = () => { 

    
    // const [val ,setVal ] = useState({})
    const {val, dispatch} = useContext(detailsContext); 
    const [ isDisable , setIsDisable ] = useState(true)

   useEffect(()=> {
       if(val.email === "" && val.name === ""){
           const user = JSON.parse(localStorage.getItem("user"));
            dispatch(user)
        }
        if(val.email!=="" && val.name !== "")
        localStorage.setItem("user", JSON.stringify(val))
   } , [])

    
    if(!localStorage.getItem("token"))
        return <Navigate to="/login"/>


    console.log(val)

    return ( 
        <div 
            style={{
                backgroundColor:"#e7feff"
            }}
        > 
            <NavBar/>
            
            <form  className="lform"
                style={{
                    marginLeft:"30rem",
                    marginTop:"5rem",
                    height:"100%"
                }}
            >

<img 
                style={{
                    height:"150px",
                    width:"150px",
                    // position:"absolute",
                    // top:"25%",
                    // left:"40%",
                    marginLeft:"14rem",
                    transform:"translate(-50% , -50%)", 
                    borderRadius:"100%",
                    overFlow:"hidden",
                    border:"1px solid #grey",
                }}
            src="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" alt="" />
                Email:
          <input 
                type="text"
                name="text"
                id="email" 
                placeholder="Enter your email"
                // onChange={e => setDetails({...details, .target.value)}
                value={val.email}
                required
                disabled
                style={{
                    fontWeight: "bolder"
                }}
            />
            
             Name:
            <input 
                    type="text"
                    name="email"
                    id="email" 
                    placeholder="Enter your name"
                    // onChange={e => setDetails({...details , name: e.target.value})}
                    value={val.name}
                    required
                    disabled = {isDisable}
                    style={{
                        fontWeight: "bolder"
                    }}
                />
            College:
            <input 
                    type="text"
                  name="email"
                    id="email" 
                    placeholder="Enter your college name"
                    // onChange={e => setDetails({...details , college: e.target.value})}
                    value={val.college}
                    required
                    disabled = {isDisable}
                    style={{
                        fontWeight: "bolder"
                    }}
                />
            role: 
            <input 
                    type="text"
                    name="email"
                    id="email" 
                    // onChange={e => setDetails({...details , role: e.target.value})}
                    value={val.role === 0?"Student":"Faculty"}
                    style={{
                        fontWeight: "bolder"
                    }}
                    disabled

                />

            {localStorage.getItem("role" === "0")?"regdno: ":""}
            {
                localStorage.getItem("role" === "0")?(
                <input 
                        type="text"
                        name="email"
                        id="email" 
                        placeholder="Enter your regdno"
                        // onChange={e => setDetails({...details , regdno: e.target.value})}
                        value={val.regdno}
                        required
                        disabled = {isDisable}
                        style={{
                            fontWeight: "bolder"
                        }}

                />):("")
            }
            State
                    <input 
                        type="text"
                        name="email"
                        id="email" 
                        placeholder="Enter your state"
                        // onChange={e => setDetails({...details , state: e.target.value})}
                        // value={details.regdno}
                       
                        required
                        disabled = {isDisable}
                        style={{
                            fontWeight: "bolder"
                        }}

                />

                        District
                <input 
                    type="text"
                    name="email"
                    id="email" 

                    placeholder="Enter your District"
                    // onChange={e => setDetails({...details , district: e.target.value})}
                    // value={details.regdno}
                    required
                    disabled = {isDisable}

            />
            {/* {
            isDisable?(
                <button class="login"
                    type="submit"
                    onClick={ () => setIsDisable(!isDisable) }
                > <h4
                    style={{
                        color: 'white'
                    }}
                > Edit</h4>
                </button> ):(

                    <button class="login"
                    type="submit"
                    onClick={ saveProfile }
                > <h4
                    style={{
                        color: 'white'
                    }}
                > Save changes</h4>
                </button>
                    
                )
            } */}
            

            <button><Link to="/editprofile">Edit profile</Link></button>

             

          </form>
            
        </div> 
    ) 
} 
export default Profile;