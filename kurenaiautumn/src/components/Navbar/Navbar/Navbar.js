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
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input bg-gray-100 rounded-full lg:w-48 w-40 input-sm"
          />
        </div>
      </div>
      <div className="nav-right">
        <i className="fa-solid text-black fa-pen-to-square"></i>
        <Link to="/editblog"><button className="signin-lg text-black text-xs mx-2">Write</button></Link>
        <Link to="/signup"><button className="signup-btn all-btn rounded-full text-xs text-white font-semibold px-3 py-2 ml-5">
          Sign up
        </button></Link>
        <Link to="/signin"><button className="signin-lg text-black text-xs mx-2">Sign In</button></Link>
        <Link to="/signin"><button className="signin-sm all-btn rounded-full text-xs text-white font-semibold px-3 py-2 mx-5">Sign In</button></Link>
       <Dropdown></Dropdown>
      </div>
    </div>
   </div>
  );
};



export default Navbar;
