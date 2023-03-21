import React, { useEffect, useRef, useState } from "react";
import userImage from "../../img/user.png";
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

    const [user, setUser] = useState([]);

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user)
    }, []);


  let menuRef = useRef();

  if (user){
    return (
        <div className='menu-container' ref={menuRef}>
        <a className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <Link to="/profile">
          <img style={{margin: "8px"}} src={userImage} alt=""></img>
        </Link>
        </a>
        </div>

    );
  }
  else{
    return null
  }
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