import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import "./Navbar.css";

const Navbar = () => {
  
  return (
   <div className="nav">
     <div className="navbar">
      <div className="nav-left">
        <div className="circles">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input bg-gray-100 rounded-full w-48 input-sm"
          />
        </div>
      </div>
      <div className="nav-right">
        <i className="fa-solid text-black fa-pen-to-square"></i>
        <p className="text-black text-xs ml-2">Write</p>
        <button className="signup-btn rounded-full text-xs text-white font-semibold px-3 py-2 ml-5">
          Sign up
        </button>
        <button className="text-black text-xs mx-5">Sign In</button>
       <Dropdown></Dropdown>
      </div>
    </div>
   </div>
  );
};



export default Navbar;
