import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route,Switch,Link,Navigate} from "react-router-dom";
import Select from './components/Select';
import StudentRegister from './components/StudentRegister';
import FacultyRegistration from './components/FacultyRegistration'
import Profile from './components/layout/Profile'
import DetailsProvider from './components/contexts/details'
import Home from './components/Home'
import Myworkshops from './components/Myworkshops'
import Create from './components/Create'
import NavBar from './components/contexts/Navbar'
import Login from './components/Login';
import EditProfile from './components/contexts/EditProfile';

ReactDOM.render(
  <Router>

    <DetailsProvider>

      {localStorage.getItem("item")?( <NavBar/>):""}
   
    <Routes>
      <Route path = "/login" element={<Login />}  />
      <Route path = "/" element={<Login />}  />
      <Route path = "/home" element={<Home />}/>
      <Route path = "/editprofile" element={<EditProfile />}/>

      {/* <Route path = "/" element={<Home />}  /> */}
      <Route path = "/myworkshops" element={<Myworkshops />}  />
      <Route path ="/create" element={<Create />} />
      <Route path = "/profile" element={<Profile />}  />
      <Route path = '/components/Select' element={<Select />}>
        <Route path = "StudentRegister" element={<StudentRegister />} />
        <Route path = "FacultyRegistration" element={<FacultyRegistration/>} />
      </Route>      
    </Routes>
  </DetailsProvider>
  </Router>

  ,
  document.getElementById('root')
);




reportWebVitals();
