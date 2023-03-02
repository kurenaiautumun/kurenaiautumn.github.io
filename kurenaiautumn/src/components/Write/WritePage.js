import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import "./Write.css";
import useTitle from "../hooks/useTItle";
import { toast } from "react-hot-toast";
import { useAsyncError } from "react-router-dom";


const Write = () => {
  const [array, setArray] = useState([]);
  const [blogId, setBlogId] = useState([]);
  const [userid, setID] = useState([])
  const [blogBody, setBody] = useState([]);

  const dataFetchedRef = useRef(false);

  console.log("url = ", window.location.pathname.split('/')[2])

  useTitle("Write");

  function getSavedData(blogId){
    console.log('inside saved data')
    fetch(`http://100.25.166.88:8080/blog?blogId=${blogId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data = ", data[0]);
        if (data["body"]) {
          console.log("got data")
          setBody(data[0].body);
        }
        if (data[0]["title"]){
          console.log(document.getElementById('title'))
          document.getElementById('title').value = data[0].title
          console.log('title is here - ', data[0].title)
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Blog not published.Please login again")
      });
  }

  function saving() {
    console.log("in saving")
    console.log(editor);
    editor.save().then((savedData) => {
      console.log("data in saving fucntion = ", savedData);
      setArray(savedData?.blocks?.map((a) => a?.data?.text));
    });
  }

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem('user'));
        setID(userid);
        console.log("user id in useEffect =", userid)
        setBlogId(window.location.pathname.split('/')[2])
      }, []);
  console.log("user id in write = ", userid);
  console.log("blog id after useeffect = ", blogId)
  const [editor, setEditor] = useState({isReady:false});

  useEffect(() => {
    getSavedData(window.location.pathname.split('/')[2]);
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    if (!editor.isReady) {
      let editor1 = new EditorJS({
        autofocus: true,
        holder: "editorjs",
        //data: blogBody,
        tools: {
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
  console.log("editor = ", editor)
  }, [editor]);

  function updateBlog() {
    console.log('inside handleWriteBlog')
    saving();
    const blog = {
      userId: userid['id'] ,
      body: array,
    };

    fetch("http://100.25.166.88:8080/updateBlog", {
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
  };

  function prints(){
    console.log('hello')
  }

  return (
    <div>
        <h1 id="title" contentEditable="true">Title</h1>
        <button className="writeSubmit all-btn" id="submit-blog" onClick={updateBlog}>Publish</button>
        <div className="text-area">
          <pre id="output"></pre>
          <div className="details-blog" id="editorjs" ></div>
        </div>
    </div>
  );
};

export default Write;
