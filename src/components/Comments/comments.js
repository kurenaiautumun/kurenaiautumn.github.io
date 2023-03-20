import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function Comments(BlogId){
    console.log("BlogID = ", BlogId["BlogId"])
    const [array, setArray] = useState([]);
    const [comment, setComment] = useState("");
    let userid = document.getElementById('userid')
    useEffect(() => {
        //setArray({});
        //setComments({});
        AllComments();
    }, []);

    function AllComments(){
        fetch(`${process.env.REACT_APP_URL}/comment/${BlogId["BlogId"]}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => (setArray(data.user)))//(loadComments(data.user)))
          .catch((err) => console.error(err));
    }

    function postComment(userId, BlogId){
        console.log("in postComment")
        console.log("comment = ", comment)
        let body = {
                "userId": userId,
                "blogId": BlogId,
                "body": comment,
                "status": "review"
            }
        fetch(`${process.env.REACT_APP_URL}/newComment`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => (console.log(data)))//(loadComments(data.user)))
          .catch((err) => console.error(err));
    }
    function updateInput(e){
        setComment(e.target.value)
        console.log("comment = ", comment)
        }

      return (
        <div>
            <h2>Comments</h2>
            <input placeholder='add comment' onChange={updateInput} type="text"></input>
            <button onClick={postComment(userid, BlogId)}>Post</button>
            {array.map((user) => (
            <div id="comments">
                <li>{user.userId}</li>
                <li>{user.body}</li>
            </div>
        ))}
        </div>
      )
    
}


export default Comments