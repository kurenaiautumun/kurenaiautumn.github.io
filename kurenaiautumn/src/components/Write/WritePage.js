import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import ImageTool from '@editorjs/image';
import List from "@editorjs/list";
import "./Write.css";
import useTitle from "../hooks/useTItle";
import { toast } from "react-hot-toast";
import { useAsyncError, useParams } from "react-router-dom";
import Likes from "../Likes/Likes";
import Comments from "../Comments/comments";

const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');


const Write = () => {
  const { blogId } = useParams();
  console.log("id = ", blogId)
  const [array, setArray] = useState([]);
  //const [blogId, setBlogId] = useState([]);
  const [userid, setID] = useState([])
  const [blogBody, setBody] = useState([]);
  const [image, setImage] = useState("");

  const dataFetchedRef = useRef(false);

  useTitle("Write");

  function getSavedData(blogId){
    console.log('inside saved data')
    fetch(`https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/blog?blogId=${blogId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data in saved data = ", data[0]);
        console.log("body in saved data = ", data[0].body);
        if (data[0].title){
          document.getElementById("BlogTitle").innerHTML = data[0].title
          console.log(document.getElementById("BlogTitle"))
        }
        else{
          console.log("no title")
        }
        var read
        if (data[0].userId==userid){
          read=false
        }
        else{
          read=true
        }
        if (data[0].body) {
          setBody(data[0].body);
          setUpEditor(data[0].body, read)
        }
        else{
          setUpEditor([], read)
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
  }

  function saving() {
    editor.save().then((savedData) => {
      console.log("data in saving fucntion = ", savedData);
      setArray(savedData);
      const blog = {
        id: blogId,
        body: savedData,
        title: document.getElementById("BlogTitle").innerHTML
      };
  
      fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/updateBlog", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("blog = ", blog)
          console.log(data);
          if (data.message) {
            console.log(data.message)
            toast.success(`Blog added successfully with title ${blog["title"]}`);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Blog not published.Please login again")
        });
    });
  }

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem('user'));
        setID(userid);
        console.log("user id in useEffect =", userid)
      }, []);

  const [editor, setEditor] = useState({isReady:false});

  function setUpEditor(body, read){
    if (!editor.isReady) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      console.log("body in editor ", blogBody)
      let editor1 = new EditorJS({
        autofocus: true,
        holder: "editorjs",
        //readOnly: read,
        data: body,
        tools: {
          quote: Quote,
          header: Header,
          image: {
            class: ImageTool,
              config: {
                endpoints: {
                  byFile: 'https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/image', // Your backend file uploader endpoint
                  byUrl: 'https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/image', // Your endpoint that provides uploading by Url
                },
                additionalRequestData:{
                  blogId: blogId,
                  userId: userid["_id"]},
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            }
          }
        }
      });
      setEditor(editor1);
    }
  }

  useEffect(() => {
    getSavedData(window.location.pathname.split('/')[2])
    }, [editor]);

  function updateBlog() {
    console.log('inside handleWriteBlog')
    saving();
  };

  function handleFileChange(e){
    if (e.target.files!=""){
      console.log("files = ", e.target.files[0])
      let body = {
        "image": e.target.files[0],
        blogId: blogId,
        userId: userid["_id"]
      }
      console.log("body = ", body)
      fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/image", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json())
      .then((data) => {console.log("url image = ", data)})
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
    }
}


  return (
    <div>
        <button className="writeSubmit all-btn" id="submit-blog" style={{float: "right"}}onClick={updateBlog}>Publish</button>
        <div className="text-area">
          <img src="" id="TitleImage"></img>
          <input type="file" onChange={handleFileChange} />
          <h1 id="BlogTitle" style={{marginLeft: "400px", marginRight: "200px"}} contentEditable="True">Title</h1>
          <div className="details-blog" id="editorjs"></div>
        </div>
    </div>
  );
};

export default Write;
