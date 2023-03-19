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
        <a className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <Link to="/profile">
          <img src={user} alt=""></img>
        </Link>
        </a>
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