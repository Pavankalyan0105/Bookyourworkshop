import React,{useState} from "react"; 
 
import detailsContext from "./context"; 
const DetailsProvider = (props) => { 
    const [user,setUser] = useState({ 
        name:"", 
        role:"", 
        email:"" ,
        college:"",
        state:"",
        regdno:""
    }) 
    return ( 
        <detailsContext.Provider value={{val:user, dispatch: (data) => setUser(data) } }> 
            {props.children} 
        </detailsContext.Provider> 
    ) 
} 
 
export default DetailsProvider;