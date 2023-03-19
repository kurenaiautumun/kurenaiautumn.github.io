import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import "./Navbar.css";
import { useEffect } from 'react';
import { toast } from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import Profile from '../../Others/Profile/Profile';
import Comments from '../../Comments/comments';


const Navbar = () => {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
  }, []);

  function Checksignup(id){
    console.log("id in check signup = ", id)
    if (id['id']==null){
      return (<Link to="/signup"><button style={{display: "inline-block"}} className="signup-btn all-btn rounded-full text-xs text-white font-semibold px-3 py-2">
      Sign up
    </button></Link>)
  }
}

  function Sign(id){
    if (id['id']==null){
      return <Link to='/signin' style={{display: "inline-block"}}>Signin</Link>
    }
    else{
      return <Link to='/signout' style={{display: "inline-block"}}>Signout</Link>
    }
  }

  function newBlog(){
    let blog = {
      userId: user['_id'],
    }
    console.log('user in newBlog route')
    fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/newBlog", {
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
          navigate(`/blog/${data.blog["_id"]}`,{b: "abc"});
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
  }

  return (
   <div className="nav">
     <div className="navbar" style={{width: "100%"}}>
      <div className="nav-left" style={{float:"left"}}>
      <Link to="/"><div className="circles">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div></Link>
        <div className="form-control">
          <input
            style={{border: "0px"}}
            type="text"
            placeholder="Search"
            className="input bg-gray-100 rounded-full 
            w-36 lg:w-48 input-sm"
          />
        </div>
      </div>
      <div style={{display: "flex"}} className="nav-right">
        
        <div id="write-button" onClick={newBlog}>
        <i className="fa-solid text-black fa-pen-to-square mx-1"></i><button className="signin-lg text-black text-xs mr-3">Write</button>
        </div>
        <div style={{display: "flex"}}>
          <Checksignup id={user} style={{"display":"flex"}} />
          <Sign id={user} style={{"display":"flex"}}></Sign>
          <Dropdown style={{"display":"flex"}}></Dropdown>
        </div>
      </div>
    </div>
   </div>
  );
};



export default Navbar;
