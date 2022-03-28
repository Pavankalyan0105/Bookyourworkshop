import './App.css';
import Login from "./components/Login";
import StudentRegister from './components/StudentRegister';
import DetailsProvider from './components/contexts/details'
import Navbar from './components/contexts/Navbar'
import Profile from "./components/layout/Profile"
import { useState , useEffect } from "react";
import NavBar from './components/contexts/Navbar';

import WorkshopCard from './components/WorkshopCard'

function App() {
  return (
      <div className="SearchBar">
        <h1>App component</h1>
        {/* <Login/> */}
        {/* <WorkshopCard/> */}
      </div>
   
  );
}

export default App;
