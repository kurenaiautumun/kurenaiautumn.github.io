import React from 'react';
import { useEffect, useState } from 'react';
import userImage from "../../img/user.png";
import { Form } from 'react-router-dom';

function Profile(){
    const [user, setUser] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
    console.log(user)
    }, []);

    return(
        <div style={{marginLeft:"30%"}}>
            <img style={{width:"100px", "height": "100px"}} src={userImage} alt=""></img>
            <Form>
                <div class="form-group">
                    <label for="name">Name</label><br></br>
                    <input type="text" class="form-control" name="email"></input>
                </div>

                <div class="form-group">
                    <label for="">Email</label><br></br>
                    <input type="text" class="form-control" editable={false} name="email"></input>
                </div>
                <div class="form-group">
                    <label for="name">Mobile Number</label><br></br>
                    <input type="text" name="mobile" class="form-control"></input>
                </div>
            </Form>
        </div>
    )
}

export default Profile;