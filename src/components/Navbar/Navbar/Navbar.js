import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
//import "./Navbar.css";
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

  function Checksignup(){
    if (user==null){
      return (
      <div><Link to="/signup"><button style={{display: "inline-block"}} style={{margin: "5px"}} className="btn btn-info">
        Sign up
        </button></Link>
        <Sign id={user} style={{"display":"flex"}}></Sign>
      </div>)
    }
    else{
      return (
        <Sign id={user} style={{"display":"flex"}}></Sign>
      )
    }
  //  console.log("id in check signup = ", user)
  //  if (user['_id']==null){
  //    return (<div><Link to="/signup"><button style={{display: "inline-block"}} style={{margin: "5px"}} className="btn btn-info">
  //    Sign up
  //  </button></Link>
  //  <Sign id={user} style={{"display":"flex"}}></Sign>
  //  </div>
  //    )
  //}
  //else{
  //  return(
  //    <Sign id={user} style={{"display":"flex"}}></Sign>
  //  )
  //}
}

  function Sign(){
    if (user==null){
      return (
        <Link to='/signin' style={{display: "inline-block"}}>
        <button className="btn btn-success" style={{margin: "5px"}}>Signin</button>
        </Link>
      )
    }
    else{
      return (
        <div>
          <Link to='/dashboard' style={{display: "inline-block", margin: "5px"}}>
          <button className="btn btn-info">Dashboard</button></Link>
          <Link to='/signout' style={{display: "inline-block", margin: "5px"}}>
            <button className="btn btn-success">Signout</button></Link>
        </div>
      )
    }
  }

  function newBlog(){
    try {
      let a = user['_id']
    }
    catch(err){
      alert("Please Login or Sign Up first")
    }
    let blog = {
      userId: user['_id'],
    }
    console.log('user in newBlog route', blog)
    //https://usershtttps-1398927084.us-east-1.elb.amazonaws.com
    fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/newBlog", {
    //fetch("http://127.0.0.1:8000/newBlog", {
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
        console.error("err = ", err);
        toast.error("Blog not published.Please login again")
      });
  }

  //return (
  // <div className="nav">
  //   <div className="navbar" style={{width: "100%"}}>
  //    <div className="nav-left" style={{float:"left"}}>
  //    <Link to="/"><div className="circles">
  //        <div className="one"></div>
  //        <div className="two"></div>
  //        <div className="three"></div>
  //      </div></Link>
  //      <div className="form-control">
  //        <input
  //          style={{border: "0px"}}
  //          type="text"
  //          placeholder="Search"
  //          className="input bg-gray-100 rounded-full 
  //          w-36 lg:w-48 input-sm"
  //        />
  //      </div>
  //    </div>
  //    <div style={{display: "flex"}} className="nav-right">
  //      
  //      <div id="write-button" onClick={newBlog}>
  //      <i className="fa-solid text-black fa-pen-to-square mx-1"></i><button className="signin-lg text-black text-xs mr-3">Write</button>
  //      </div>
  //      <div style={{display: "flex"}}>
  //        <Checksignup id={user} style={{"display":"flex"}} />
  //        <Sign id={user} style={{"display":"flex"}}></Sign>
  //        <Dropdown style={{"display":"flex"}}></Dropdown>
  //      </div>
  //    </div>
  //  </div>
  // </div>
  //);

  return (
    <nav class="navbar navbar-light" style={{"background-color": "#FF9F44", width: "100%"}}>
      <div className="nav-left">
        <div>
          <a href="/">
            <img style={{width:"50px", height:"50px"}} src="https://kurenai-image-testing.s3.ap-south-1.amazonaws.com/logow-removebg-preview+(2).jpg"></img>
          </a>
          <input
            style={{height: "40px", border: "0px", "border-radius": "10px"}}
            type="text"
            placeholder="      Search"
            className="input bg-gray-100 rounded-full 
            w-36 lg:w-48 input-sm"
          />
        </div>
      </div>
      <div style={{display: "flex"}} className="nav-right">
      
        <div id="write-button" onClick={newBlog}>
        <i className="fa-solid text-black fa-pen-to-square mx-1"></i><button className="btn btn-primary" style={{margin: "5px"}}>Write</button>
        </div>
        <div style={{display: "flex"}}>
          <Checksignup style={{"display":"flex"}} />
          {/*<Sign id={user} style={{"display":"flex"}}></Sign>*/}
          <Dropdown style={{"display":"flex"}}></Dropdown>
        </div>
      </div>
    </nav>
  )
};



export default Navbar;
