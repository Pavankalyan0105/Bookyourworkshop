import { useState , useEffect , useContext } from 'react';
import { Navigate , Link,Routes, Route , BrowserRouter} from "react-router-dom"
import "../css/Navbar.css";
import detailsContext from './context';

//Pages

const  NavBar =  () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const [role , setRole ] = useState(0);
  const [ token , setToken ] = useState("")
  const { val , dispatch } = useContext(detailsContext)

  const [color , setColor ] = useState({
    explore: "white",
    myworkshops:"white",
    conduct:"white",
    profile:"white",
    logout:"white",
  })

 

useEffect( () => {
    setRole(localStorage.getItem("role"))
    setToken(localStorage.getItem("token"))
  } , [])

  useEffect( () => {
    if(val.email === "" && val.name === ""){
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(user)
    }
  } , [])

  const handleLogin = () => {
    console.log("clicked log in")

    setInterval(() => {
      setRole(localStorage.getItem("role"))
      setToken(localStorage.getItem("token"))
      // console.log(token);  
    }, 1000)
  }

  const handleRegister = () => {
    console.log("clicked log in")

    setInterval(() => {
      setRole(localStorage.getItem("role"))
      setToken(localStorage.getItem("token"))
      // console.log(token);  
    }, 100)
  }

  
  
  return (
    <div
      
    >
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
         
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            
            {(role === "0")?
            <li className="nav-item">
              <Link
                style={{
                  color: color.explore
                }}
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                // onClick={ () => setColor({
                //   explore: "red",
                //   myworkshops:"black",
                //   conduct:"black",
                //   profile:"black",
                //   logout:"black",
                // })}
              >
                Explore 
              </Link>
            </li>
            :""}
            {
              token?(
                <li className="nav-item">
              <Link
                style={{
                  color: color.myworkshops
                }}

                exact
                to="/myworkshops"
                activeClassName="active"
                className="nav-links"
                // onClick={ () => setColor({
                //   explore: "black",
                //   myworkshops:"red",
                //   conduct:"black",
                //   profile:"black",
                //   logout:"black",
                // })}
              >
                My workshops
              </Link>
            </li>
              ):""
            }

            {
              role === "1"?(
                <li className="nav-item">
              <Link
                style={{
                  color: color.conduct
                }}
               
                // onClick={ () => setColor({
                //   explore: "black",
                //   myworkshops:"black",
                //   conduct:"red",
                //   profile:"black",
                //   logout:"black",
                // })}

                to="/create"
                activeClassName="active"
                className="nav-links"
                // onClick={click ? handleClick : null}
              >
                Conduct
              </Link>
            </li>
              ):""
            }

            {
              !token?(
                <li className="nav-item">
              <Link
                 style={{
                  color: color.conduct
                }}
               

                exact
                to="/components/Select"
                activeClassName="active"
                className="nav-links"
                // onClick={ () => setColor({
                //   explore: "black",
                //   myworkshops:"black",
                //   conduct:"red",
                //   profile:"black",
                //   logout:"black",
                // })}
              >
                <button
                  onClick = {handleRegister}
                >Register</button>
              </Link>
            </li>
              ):""
            }

           {
              token?(<li className="nav-item">
              <Link

              style={{
                color: color.profile
              }}

                exact
                to="/profile"
                activeClassName="active"
                className="nav-links"
                
              >
                Profile
              </Link>
            </li>):""
           }
            
           {
             (!token)?(
              <li className="nav-item">
              <Link
              
              style={{
                color: color.logout
              }}
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
              >
                <button
                  onClick = {handleLogin}
                >login</button>
              </Link>
            </li>
             ):""
           }

           {
             (token)?(
              <li className="nav-item">
              <Link
               style={{
                color: color.logout
              }}
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick = { () => {
                  localStorage.clear()
                  setToken("")
                  setRole("")
                 }
              }
              >
                logout
              </Link>
            </li>
             ):""
           }
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>
  );
}

export default NavBar;