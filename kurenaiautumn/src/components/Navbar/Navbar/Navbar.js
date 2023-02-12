import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import "./Navbar.css";

const Navbar = () => {
  
  return (
   <div className="nav">
     <div className="navbar">
      <div className="nav-left">
        <Link to="/">
        <div className="circles">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div></Link>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input bg-gray-100 rounded-full lg:w-48 w-40 input-sm"
          />
        </div>
      </div>
      <div className="nav-right">
        <i className="fa-solid text-black fa-pen-to-square mx-1"></i>
        <Link to="/write"><button className="signin-lg text-black text-xs mr-3">Write</button></Link>
        <Link to="/signup"><button className="signup-btn all-btn rounded-full text-xs text-white font-semibold px-3 py-2">
          Sign up
        </button></Link>
        <Link to="/signin"><button className="signin-lg text-black text-xs mx-3">Sign In</button></Link>
        <Link to="/signin"><button className="signin-sm all-btn rounded-full text-xs text-white font-semibold px-3 py-2 mx-5">Sign In</button></Link>
       <Dropdown></Dropdown>
      </div>
    </div>
   </div>
  );
};



export default Navbar;
