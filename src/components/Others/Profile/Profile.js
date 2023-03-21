import React from 'react';
import { useEffect, useState } from 'react';
import userImage from "../../img/user.png";
import { Form } from 'react-router-dom';

function Profile(){
    const [user, setUser] = useState([]);
    const [profileData, setProfile] = useState({userId: "", body: {}})
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
    console.log(user)
    let dict = {userId: user["_id"], body: {}}
    setProfile(dict)
    getValues(user["_id"]);
    }, []);

    function setValues(data){
        let ids = ["name", "email", "mobile"]
        console.log("data = ", data)
        for (let i in ids){
            console.log(ids[i])
            document.getElementById(ids[i]).value = data[i]
        }
    }

    function getValues(id){
        fetch("http://127.0.0.1:8080/userinfo", {
            method: "POST",
            body: JSON.stringify({userId: id, body: {}})
        })
        .then((res => res.json()))
        .then((data => {setValues(data.info); console.log("data = ", data.info)}))
    }

    function sendProfile(e){
        e.preventDefault();
        let total_body = {
            "userId": user["_id"],
            "body": {}
        }
        let body = {
            "name": e.target.name.value,
            "email": e.target.email.value,
            "mobile": e.target.mobile.value
        }
        total_body["body"] = body
        console.log(e.target.name.value)
        console.log("body = ", profileData)
        fetch("http://127.0.0.1:8080/userinfo", {
            method:"POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(total_body)
        })
        .then((res => res.json()))
        .then((data=>{console.log("data after sedning = ", data)}))
    }

    function changeProfile(e){
        let body = profileData
        console.log(e.target.name)
        body["body"][e.target.name] = e.target.value
        setProfile(body)
    }

    return(
        <div style={{marginLeft:"30%"}}>
            <img style={{width:"100px", "height": "100px"}} src={userImage} alt=""></img>
            <Form onSubmit={sendProfile}>
                <label for="body">
                    <div class="form-group">
                        <label for="name">Name</label><br></br>
                        <input id="name" onChange={changeProfile} type="text" class="form-control" name="name"></input>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label><br></br>
                        <input id="email" onChange={changeProfile} type="email" class="form-control" editable={false} name="email"></input>
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile Number</label><br></br>
                        <input id="mobile" onChange={changeProfile} type="number" name="mobile" class="form-control"></input>
                    </div>
                </label>
                <div>
                    <button class="btn btn-primary">Save</button>
                </div>
            </Form>
        </div>
    )
}

export default Profile;