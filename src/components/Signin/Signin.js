import React from "react";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTItle";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import qs from "qs"
import { Form } from "react-router-dom";

const Signin = () => {
  const [user, setUser] =useState([]);
  const navigate = useNavigate();

  useTitle("Signin")

  async function handleLogin(e){

    e.preventDefault()

    //console.log(e.target)

    let data={}

    data["username"] = e.target.name.value
    //data["email"] = e.target.email.value
    data["password"] = e.target.password.value

    //console.log("in singup handle", data)
    
  fetch(`${process.env.REACT_APP_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log("data in signup", data);
      //console.log(data.user._id);
      if(data.user._id !== null){
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(data.message)
        navigate(`/dashboard`);
        window.location.reload(false);
      }
    })
    .catch((err) => {
      // console.log(err.message)
      if(err){
        //console.log(err)
        toast.error("Check Email or Password")
      }
});
  }

  //const handleLogin = (data) => {
  //  console.log(data)
  //  fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/login", {
  //      method: "POST",
  //      headers: {
  //        "content-type": "application/json",
  //      },
  //      body: JSON.stringify(data),
  //    })
  //      .then((res) => res.json())
  //      .then((data) => {
  //        console.log(data)
  //        setUser(data.user._id);
  //        if(data.user._id !== null){
  //          toast.success(data.message)
  //          localStorage.setItem('user', JSON.stringify(data.user));
  //          console.log("data to be stored locally = ", data.user)
  //          navigate(`/dashboard`);
  //          window.location.reload(false);
  //        }
  //      })
  //      .catch((err) => {
  //    console.error(err)
  //    if(err){
  //      toast.error("Wrong Username or Password")
  //    }
  //});
  //};


  //return (
  //  <div className="inner-div">
  //    <div class="row" style={{marginLeft: "37%"}}>
  // 
  // <Form onSubmit={handleLogin}>
  //                <label for="body">
  //                    <div class="form-group" style={{marginTop: "20px"}}>
  //                        <input id="name" placeholder="User Name / Email" type="text" class="form-control input-lg" name="name"></input>
  //                    </div>
  //                    <div class="form-group" style={{marginTop: "20px"}}>
  //                        <input id="password" placeholder="password" type="password" name="password" class="form-control input-lg"></input>
  //                    </div>
  //                </label>
  //                <div>
  //                    <button class="btn btn-primary" style={{marginTop: "10px"}}>Login</button>
  //                </div>
  //      </Form>
  //        <p>
  //          Do you have an account yet?
  //        </p>
  //        <Link to="/signup">
  //          <p>
  //            Create an account
  //          </p>
  //        </Link>
  //      </div>
  //    </div>
  //);
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 d-flex justify-content-center">
          <h2>Please login with your account Details</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 d-flex justify-content-center">
        <Form onSubmit={handleLogin}>
         <label for="body">
             <div class="form-group" style={{marginTop: "20px"}}>
                 <input id="name" placeholder="User Name / Email" type="text" class="form-control input-lg" name="name"></input>
             </div>
             <div class="form-group" style={{marginTop: "20px"}}>
                 <input id="password" placeholder="password" type="password" name="password" class="form-control input-lg"></input>
             </div>
         </label>
         <div>
             <button class="btn btn-primary" style={{marginTop: "10px"}}>Login</button>
         </div>
      </Form>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 d-flex justify-content-center">
        <p>
          Do you have an account yet?
        </p>
        <Link to="/signup">
          <p>
            Create an account
          </p>
        </Link>
        </div>
      </div>
      <div class="row" style={{marginTop: "300px"}}>
        <div class="col-sm-12 d-flex justify-content-center">Brought to you by Kurenai</div>
      </div>
    </div>
  )
};

export default Signin;
