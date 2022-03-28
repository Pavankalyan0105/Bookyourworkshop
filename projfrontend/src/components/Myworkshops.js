import { useState , useEffect , useContext} from 'react';
import axios from 'axios';
import Card from './Card';
import { Link } from 'react-router-dom';
import NavBar from './contexts/Navbar';
import "./css/wrapper.css";

const Myworkshops = () => {

    const [workshops , setWorkshops] = useState([])
    const [role , setRole ] = useState(0)
    const [searchTerm , setSearchTerm] = useState("")
    
    const token = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    useEffect(async () => {
        await axios.get(
            `http://localhost:8000/api/workshops/${localStorage.getItem("id")}`,
            token
          ).then(
              res => setWorkshops(res.data)
          )
        },[])
    
    useEffect( () => {
            setRole(localStorage.getItem("role"))
    } , [])

    

    return (
        <div className="workshops">
            <NavBar/>
            <h1
                style={{
                    textAlign:"center",
                    margin:"1rem"
                }}
            >My workshops</h1>
            <input 
                    style={{
                        align:"center",
                        marginLeft:"500px",
                        width:"30%",
                        borderRadius:"1rem",
                        backgroundColor:"#FFFACD",
                    }}
                type="text" 
                placeholder="Search .. "
                onChange = {
                    (event) => {
                        setSearchTerm(event.target.value)
                    }
                }
            />
            <div className="wrapper">

            {
                workshops.filter( 
                    (ws) => {
                        if(searchTerm == "")
                            return ws.name;
                        else if(ws.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        return ws;
                    }
                 ).map( (ws,key) => {
                     if(role === "0")
                        ws.seats = -1;
                     return (
                        <Card className="user" workshop={ws} page="myworkshop"/>
                     )
                 } )
            }

            </div>
            

           

        </div>
    )
}
export default Myworkshops;