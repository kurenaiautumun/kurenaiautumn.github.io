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
import { data } from "autoprefixer";

const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');


const Write = () => {
  const [array, setArray] = useState([]);
  const [read, setRead] = useState(true)
  //const [blogId, setBlogId] = useState([]);
  const [userid, setID] = useState(false)
  const [blogBody, setBody] = useState([]);
  const [blogId, setBlogId] = useState(window.location.pathname.split('/')[2]);
  console.log("blogId = ", blogId)
  const [gotData, setGotData] = useState(false)

  const [image, setImage] = useState("");

  const dataFetchedRef = useRef(false);

  useTitle("Write");

  function GetSavedData(){
    if (gotData){
      return null
    }
    if (userid==false){
      console.log("user id in not here")
      return null
    }
    console.log("user id = ", userid)
    console.log('inside saved data in ', `https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/blog?blogId=${blogId}`)
    fetch(`https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/blog?blogId=${blogId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGotData(true);
        console.log("data in saved data = ", data[0]);
        if (data[0].title){
          document.getElementById("BlogTitle").innerHTML = data[0].title
          console.log(document.getElementById("BlogTitle"))
        }
        else{
          console.log("no title")
        }
        console.log("user id from backend = ", data[0].userId)
        var read;
        if (data[0].userId==userid["_id"]){
          console.log(data[0].userId, " you are the writer - ", userid["_id"])
          setRead(false);
        }
        else{
          console.log(data[0].userId, " you are not the writer - ", userid["_id"])
          setRead(true)
        }
        if (data[0].body) {
          setBody(data[0].body);
          //setUpEditor(data[0].body)
        }
        else{
          //setUpEditor([])
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
        title: document.getElementById("BlogTitle").innerHTML,
        titleImage: gotImage["url"]
      };
  
      fetch("http://127.0.0.1:8080/updateBlog", {
      //fetch("http://127.0.0.1:8000/updateBlog", {
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
        //getSavedData(window.location.pathname.split('/')[2])
      }, []);

  const [editor, setEditor] = useState({isReady:false});

  function SetUpEditor(){
    if (gotData==false){
      return null
    }
    if (!editor.isReady) {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      console.log("body in editor ", blogBody)
      let editor1 = new EditorJS({
        autofocus: true,
        holder: "editorjs",
        readOnly: read,
        data: blogBody,
        tools: {
          quote: Quote,
          header: Header,
          image: {
            class: ImageTool,
              config: {
                endpoints: {
                  byFile: 'http://127.0.0.1:8000/image', // Your backend file uploader endpoint
                  byUrl: 'http://127.0.0.1:8000/image', // Your endpoint that provides uploading by Url
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


  function updateBlog() {
    console.log('inside handleWriteBlog')
    saving();
  };

  const [gotImage, setGotImage] = useState([]);

  function middleImage(data){
    setGotImage(data)
  }

  async function handleFileChange(e){
    if (e.target.files!=""){
      console.log("files = ", e.target.files[0])
      let body = new FormData();
      body.append("blogId", blogId)
      body.append("userId", userid["_id"])
      body.append("image", e.target.files[0])
      //let body = {
      //  image: e.target.files[0],
      //  blogId: blogId,
      //  userId: userid["_id"]
      //}
      console.log("body = ", body)
      //fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/image", {
      fetch("http://127.0.0.1:8080/titleImage", {
        method: "POST",
        body: body
      }).then((res) => res.json())
      .then((data) => {
        middleImage(data.file);
        console.log("url image of uploaded = ", data.file);
        })
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
    }
}

function TitularImage(){
  if (gotImage){
    console.log("title image = ", gotImage)
    return(
      <img src={gotImage["url"]} style={{width: "300px", height:"200px"}}></img>
    )
  }
  else{
    console.log("no image")
    return null
  }
}

console.log("user id = ", userid)


  return (
    <div>
       <GetSavedData />
       <SetUpEditor />
        <button className="writeSubmit all-btn" id="submit-blog" style={{float: "right"}}onClick={updateBlog}>Publish</button>
        <div className="text-area">
          <TitularImage />
          <img src="" id="TitleImage"></img>
          <input type="file" onChange={handleFileChange} />
          <h1 id="BlogTitle" style={{marginLeft: "400px", marginRight: "200px"}} contentEditable="True">Title</h1>
          <div className="details-blog" id="editorjs"></div>
        </div>
    </div>
  );
};

export default Write;
