import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import "./Navbar.css";
import { useEffect } from 'react';
import { toast } from "react-hot-toast";
import {useNavigate } from "react-router-dom";


const Navbar = () => {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
  }, []);

  function Sign(id){
    if (id['id']==null){
      return <a href='/signin'>Signin</a>
    }
    else{
      return <a href='/signout'>Signout</a>
    }
  }

  function newBlog(){
    let blog = {
      userId: user['id'],
    }
    console.log('user in newBlog route')
    fetch("http://100.25.166.88:8080/newBlog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.blog["_id"]) {
          alert(`Blog added successfully with id ${data.blog["_id"]}`);
          navigate(`/write/${data.blog["_id"]}`);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
  }

  return (
   <div className="nav">
     <div className="navbar">
      <div className="nav-left">
      <Link to="/"><div className="circles">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div></Link>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input bg-gray-100 rounded-full 
            w-36 lg:w-48 input-sm"
          />
        </div>
      </div>
      <div className="nav-right">
        
        <div id="write-button" onClick={newBlog}>
        <i className="fa-solid text-black fa-pen-to-square mx-1"></i><button className="signin-lg text-black text-xs mr-3">Write</button>
        </div>
        <Link to="/signup"><button className="signup-btn all-btn rounded-full text-xs text-white font-semibold px-3 py-2">
          Sign up
        </button></Link>
        <Link to="/signin"><button className="signin-lg text-black text-xs mx-3">Sign In</button></Link>
        <Sign id={user}></Sign>
        
       <Dropdown></Dropdown>
      </div>
    </div>
   </div>
  );
};



export default Navbar;
