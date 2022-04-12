import {useEffect , useState} from 'react';
import axios from 'axios';
import Card from './Card';
import {Navigate} from 'react-router-dom';
import './css/SearchBar.css';
import NavBar from './contexts/Navbar';
import './css/wrapper.css';

const Home = () => {
    const [ workshops  , setWorkshops ] = useState([])
    // const [ auth , setAuth] = useState(false)
    const [searchTerm , setSearchTerm] = useState("")

    useEffect(async () => {

         await axios.get(
            "http://localhost:8000/api/getallworkshops")
          .then(
              res => setWorkshops(res.data)
          ).catch( err =>
              console.log(err.message)
          )
    } , [])

    // useEffect( () => {
    //     if(localStorage.getItem("token"))
    //         // setAuth(true)
    // } , [])

    // if(!auth)
    //     return  <Navigate to="/"/>

    return (
        <div className="workshops ">
            <NavBar/>
            <h1
                style={{
                    textAlign:"center",
                    margin:"1rem"
                }}
            >All workshops</h1>
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
                     return (
                        <Card key={Math.floor((Math.random() * 24) + 1) } className="user" workshop={ws} page="Home"/>
                     )
                 } )
            }    

            </div>
            
            

        </div>
    )

}

export default Home;