import React,{useState, useContext , useEffect} from "react";
import Select from "./Select";
import { Navigate , Link, Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from './contexts/Navbar'
import detailsContext from '../components/contexts/context';
import Home from '../components/Home';
import "./css/LoginForm.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const Login = () => {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [user , setUser] = useState({})
    const [ auth , setAuth ] = useState(false) 
    const [err , setErr] = useState("")

    const {dispatch} = useContext(detailsContext)
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            "http://localhost:8000/api/signin",
            { email, password }
          ).then(
            async res =>  (
                await setUser(res.data.user),
                console.log(res.data.user),
                // keep user in context 
                dispatch(res.data.user),
                // call function
                localStorage.setItem("user" , JSON.stringify(res.data.user)),
                localStorage.setItem("token" , res.data.token),
                localStorage.setItem("id" , res.data.user._id),
                localStorage.setItem("role" , res.data.user.role),
                setAuth(true),
                toast.success("login successful!", {
                  position: toast.POSITION.BOTTOM_RIGHT
                })
                // Redirect to dashboard after login
            )
       ).catch(
           err => {
             setErr("Please enter valid details")
             toast.error("Please Enter Valid details!", {
              position: toast.POSITION.BOTTOM_RIGHT,
              delay: 1000
            });
          }
       )

    }

    useEffect( () => {
        if(localStorage.getItem("token")) setAuth(true)
    }, [])


    if(auth)
      return <Navigate to="/myworkshops"/>

   
    return(
        <div className="content">
          <div className="flex-div">
        <div className="name-content">
          <h1 className="logo">Book Your Workshop</h1>
          <p>  </p>
        </div>
          <form onSubmit={handleSubmit} className="lform">
          <input 
                type="email"
                name="email"
                id="email" 
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type = "password"
                name = "password"
                id = "password"
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                />
            <button class="login"
                 type="submit"
            >Log In</button>
            
            <Link to = "/components/Select">
                <button 
                className="create-account"
                type="submit"
                id = "Register"
                >Register</button><br />
                {err}
            </Link>
          </form>
      </div>
    </div>
    )
}

export default Login;