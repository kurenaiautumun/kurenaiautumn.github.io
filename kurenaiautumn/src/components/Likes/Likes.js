import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function Likes(BlogId){
    console.log("BlogID = ", BlogId["BlogId"])
    const [array, setArray] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        //setArray({});
        //setComments({});
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user)
        AllLikes();
    }, []);

    function AllLikes(){
        fetch(`http://100.25.166.88:8080/Likes/${BlogId["BlogId"]}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((data) => (setArray(data.likes)))//(loadComments(data.user)))
        .catch((err) => console.error(err));
    }

    function SendLike(BlogId){
        let body = {
            "blogId": BlogId,
            "userId": user["_id"],
            //"Date": "20230101",
        }
        console.log('sent')
        fetch(`http://100.25.166.88:8080/Likes/${BlogId["BlogId"]}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
          })
          .then((res) => res.json())
          .then((data) => (console.log(data.message)))//(loadComments(data.user)))
          .catch((err) => console.error(err));
        }
      return (
        <div>
            <button onClick={SendLike(BlogId)}>Like</button>
            {array.map((user) => (
            <div>
                <li>{user.userId}</li>
            </div>
        ))}
        </div>
      )
    
}

export default Likes