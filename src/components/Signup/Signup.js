import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTItle';

import { Form } from 'react-router-dom';


const Signup = () => {

  const [success, setSuccess] = useState(false)

  function printe(){
    console.log("success = ", success)
  }
 

  useTitle("Signup")
      async function handleSignup(e){

        e.preventDefault()

        console.log(e.target)

        let data={}

        data["username"] = e.target.name.value
        data["email"] = e.target.email.value
        data["password"] = e.target.password.value

        console.log("in singup handle")
        
      fetch("http://100.25.166.88:8080/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setSuccess(true);
          console.log("data in signup", data);
          console.log(data.user._id);
          if(data.user._id !== null){
            toast.success(data.message)
          }
        })
        .catch((err) => {
          // console.log(err.message)
          if(err){
            console.log(err)
            toast.error("A user with the given username is already registered")
          }
  });
      }


    return (
      <div className="inner-div">
        <button onClick={printe}>adsfads</button>
        <div style={{marginLeft: "37%"}}>
          <h2>Please enter your details</h2>
        <Form onSubmit={handleSignup}>
                  <label for="body">
                      <div class="form-group" style={{marginTop: "20px"}}>
                          <input id="name" placeholder="User Name" type="text" class="form-control input-lg" name="name"></input>
                      </div>

                      <div class="form-group" style={{marginTop: "20px"}}>
                          <input id="email" placeholder="email" type="email" class="form-control input-lg" editable={false} name="email"></input>
                      </div>
                      <div class="form-group" style={{marginTop: "20px"}}>
                          <input id="password" placeholder="password" type="password" name="password" class="form-control input-lg"></input>
                      </div>
                  </label>
                  <div>
                      <button class="btn btn-primary" style={{marginTop: "10px"}}>Register</button>
                  </div>
        </Form>
        <p className="text-fuchsia-600 text-xs font-semibold" style={{marginTop: "10px"}}>Already have an account?</p>
        <Link to='/signin'><button style={{marginTop: "5px"}} className="btn btn-success ">
            Sign in
          </button></Link>
      </div>
    </div>
 
    );
};

export default Signup;
