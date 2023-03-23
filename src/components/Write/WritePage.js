import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import ImageTool from '@editorjs/image';
import List from "@editorjs/list";
import useTitle from "../hooks/useTItle";
import { toast } from "react-hot-toast";
import { useAsyncError, useParams } from "react-router-dom";
import Likes from "../Likes/Likes";
import Comments from "../Comments/comments";
import { data } from "autoprefixer";
import Recommendations from "../Recommendations/recommend";

//import 'Write.css'

const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');


const Write = () => {
  const [array, setArray] = useState([]);
  const [read, setRead] = useState(true)
  //const [blogId, setBlogId] = useState([]);
  const [userid, setID] = useState(false)
  const [blogBody, setBody] = useState([]);
  const [blogId, setBlogId] = useState(window.location.pathname.split('/')[2]);
  //console.log("blogId = ", blogId)
  const [gotData, setGotData] = useState(false)

  const [owner, setOwner] = useState();

  const [image, setImage] = useState("");

  const [title, setTitle] = useState("Title")

  function HTMLTitle(){
    useTitle(title);
  }

  const dataFetchedRef = useRef(false);

  function GetSavedData(){
    if (gotData){
      return null
    }
    if (userid==false){
      //console.log("user id in not here")
      return null
    }
    //console.log("user id = ", userid)
    fetch(`${process.env.REACT_APP_URL}/blog?blogId=${blogId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGotData(true);
        if (data[0].titleImage){
          //console.log("image title = ", data[0].titleImage)
          middleImage(data[0].titleImage);
        }
        //console.log("data in saved data = ", data[0]);
        if (data[0].title){
          setTitle(data[0].title)
        }
        else{
          //console.log("no title")
        }
        //console.log("user id from backend = ", data[0].userId)
        var read;
        try{
        if (data[0].userId==userid["_id"]){
          console.log(data[0].userId, " you are the writer - ", userid["_id"])
          setRead(false);
        }
        else{
          console.log(data[0].userId, " you are not the writer - ", userid["_id"])
          setRead(true)
        }}
        catch(err){
          //console.log(err)
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
        //console.error(err);
        toast.error("Blog not published.Please login again")
      });
  }

  function saving() {
    editor.save().then((savedData) => {
      //console.log("data in saving fucntion = ", savedData);
      setArray(savedData);
      const blog = {
        id: blogId,
        body: savedData,
        title: cleanHtml(document.getElementById("BlogTitle").innerHTML),
        titleImage: gotImage
      };

      //console.log(cleanHtml(document.getElementById("BlogTitle").text))
  
      fetch(`${process.env.REACT_APP_URL}/updateBlog`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log("blog = ", blog)
          //console.log(data);
          if (data.message) {
            //console.log(data.message)
            toast.success(`Blog added successfully with title ${blog["title"]}`);
          }
        })
        .catch((err) => {
          //console.error(err);
          toast.error("Blog not published.Please login again")
        });
    });
  }

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem('user'));
        setID(userid);
        //console.log("user id in useEffect =", userid)
        //getValues(userid["_id"])
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
      //console.log("body in editor ", blogBody)
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
                  byFile: `${process.env.REACT_APP_URL}/image`, // Your backend file uploader endpoint
                  byUrl: `${process.env.REACT_APP_URL}/image`, // Your endpoint that provides uploading by Url
                },
                additionalRequestData:{
                  blogId: blogId,
                  userId: imageUploading()},
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

  function imageUploading(){
    if (userid){
      return userid["_id"]
    }
    else{
      return null
    }
  }


  function updateBlog() {
    //console.log('inside handleWriteBlog')
    saving();
  };

  const [gotImage, setGotImage] = useState([]);

  function middleImage(data){
    setGotImage(data)
  }

  async function handleFileChange(e){
    if (e.target.files!==""){
      //console.log("files = ", e.target.files[0])
      let body = new FormData();
      body.append("blogId", blogId)
      body.append("userId", userid["_id"])
      body.append("image", e.target.files[0])
      //let body = {
      //  image: e.target.files[0],
      //  blogId: blogId,
      //  userId: userid["_id"]
      //}
      //console.log("body = ", body)
      //fetch("https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/image", {
      fetch(`${process.env.REACT_APP_URL}/titleImage`, {
        method: "POST",
        body: body
      }).then((res) => res.json())
      .then((data) => {
        middleImage(data.file["url"]);
        //console.log("url image of uploaded = ", data.file);
        })
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
    }
}

function cleanHtml(innerHTML) {
  innerHTML = innerHTML.replaceAll('<div>', '')
  innerHTML = innerHTML.replaceAll("</div>", '')
  return innerHTML
}


function TitularImage(){
  if (gotImage){
    //console.log("title image = ", gotImage)
    return(
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-4">
          <img src={gotImage} style={{height:"400px"}}></img>
        </div>
      </div>
    )
  }
  else{
    //console.log("no image")
    return null
  }
}

function getValues(id){
  //console.log("id = ", id)
  fetch(`${process.env.REACT_APP_URL}/userinfo/${id}`, {
      method: "GET",
  })
  .then((res => res.json()))
  .then((data => {console.log("data = ", data["userInfo"]); setDetails(data);}))
}

//console.log("user id = ", userid)

const [userDetails, setDetails] = useState()

function UserNames(){
  if ((userDetails)){
    //console.log("time in body = ", blogBody["time"])
    let time = new Date(blogBody["time"]).toDateString()
    //console.log("time = ", time)
    if (time!="Invalid Date"){
    return(
      <div class="container">
      <div class="row" style={{width: "400px"}}>
        {/*<div class="col-sm-12">{userDetails["userInfo"].body["name"]}</div>*/}
        <div class="col-sm-1" style={{height: "50px", width: "50px"}}><img style={{height: "50px", width: "50px"}} src="https://kurenai-image-testing.s3.ap-south-1.amazonaws.com/writerlogo.jpeg"></img></div>
        <div class="col-sm-8" style={{marginLeft: "5px", height: "50px", width: "300px"}}>
          {userid["username"]}
          <div>{time}</div>
        </div>
      </div>
      </div>
    )
  }
}
}

function ShowUploadImage(){
  //getValues();
  //console.log("user details = ", userDetails)
  if (read==false){
    return (
      <input type="file" onChange={handleFileChange} style={{marginLeft: "65%"}}/>
    )
  }
}

function PublishButton(){
  //console.log("read = ", read)
  if (read==false){
    return (
      <div class="row">
        <div class="sm-3"><button className="btn btn-danger" style={{marginTop: "10px"}} id="submit-blog" onClick={updateBlog}>Publish</button></div>
    </div>
    )
  }
  else{
    return null
  }
}

  return (
    //<div class="container-fluid">
    //   <GetSavedData />
    //   <SetUpEditor />
    //   <PublishButton />
    //   <div className="row">
    //    <div className="text-area">
    //      <TitularImage />
    //      <img src="" id="TitleImage"></img><br></br>
    //      <ShowUploadImage />
    //      <div className="details-blog" id="editorjs"></div>
    //    </div>
    //  </div>
    //</div>
      <div class="container-fluid divisions">
        <HTMLTitle />
      <GetSavedData />
      <SetUpEditor />
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-8 text-center">
        <pre style={{minHeight: "50px", "white-space": "pre-wrap", minWidth: "100px", fontSize: "45px", fontFamily: "arial", fontStyle: "bold"}} id="BlogTitle" class="text-center" contentEditable={!read}>{title}</pre>
    </div>
    <div class="col-sm-2"><PublishButton /></div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-1"></div>
    <div class="col-sm-11">
      <TitularImage />
      <ShowUploadImage />
    </div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-sm-12">
      <div id="editorjs"></div>
    </div>
  </div>
  <div class="row">
    <UserNames/>
  </div>
  <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-10">
      {/*<Recommendations />*/}
    </div>
  </div>
  </div>
  );
};

export default Write;
