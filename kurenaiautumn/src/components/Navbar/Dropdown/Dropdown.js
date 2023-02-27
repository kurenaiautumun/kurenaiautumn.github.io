import React, { useEffect, useRef, useState } from "react";
import user from "../../img/user.png";
import edit from "../../img/edit.png";
import inbox from "../../img/envelope.png";
import settings from "../../img/settings.png";
import help from "../../img/question.png";
import logout from "../../img/log-out.png";
import './Dropdown.css'
import { Link, useLoaderData } from "react-router-dom";
import useTitle from "../../hooks/useTItle";

const Dropdown = (_id) => {

    const [open, setOpen] = useState(false);
    useTitle("Profile")

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        // console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
    return (
        <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user} alt=""></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Zinat<br/><span>Website Designer</span></h3>
          <ul>
            <Link to="/profile"><DropdownItem img = {user} text = {"My Profile"}/></Link>
            <Link to="/editprofile"><DropdownItem img = {edit} text = {"Edit Profile"}/></Link>
            <Link to={`/dashboard/${_id}`}><DropdownItem img = {inbox} text = {"Dashboard"}/></Link>
            <DropdownItem img = {settings} text = {"Settings"}/>
            <DropdownItem img = {help} text = {"Helps"}/>
            <DropdownItem img = {logout} text = {"Logout"}/>
          </ul>
        </div>
      </div>
    );
};

function DropdownItem(props) {
    return (
      <li className="dropdownItem">
        <img src={props.img} alt=""></img>
        <p> {props.text} </p>
      </li>
    );
  }

export default Dropdown;