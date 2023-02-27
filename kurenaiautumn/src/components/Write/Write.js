import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import "./Write.css";
import useTitle from "../hooks/useTItle";
import { toast } from "react-hot-toast";


const Write = () => {
  const [array, setArray] = useState([]);
  
  console.log(window.location.pathname)
 
  let userid = window.location.pathname.split('/')[2]

  console.log('user id = ', userid)

  useTitle("Write");

  function saving() {
    const output = document.getElementById("output");
    editor.save().then((savedData) => {
      output.innerHTML = JSON.stringify(savedData, null, 4);
      // console.log(savedData);
      savedData?.blocks?.map((a) => a?.data?.items?.map(item => 
        console.log(item)
      ));
      setArray(savedData?.blocks?.map((a) => a?.data?.text));
      // setArray(savedData?.blocks?.map((a) => a?.data?.text || a?.data?.items?.map(item => <li>{item}</li>)));
    });
  }

  console.log(array)

  let content = array.join("</br></br>");
  console.log(content);

  let editor = { isReady: false };

  useEffect(() => {
    // setUserid(document.getElementById('userid').innerText)
    // console.log(userid)
    if (!editor.isReady) {
      editor = new EditorJS({
        autofocus: true,
        holder: "editorjs",
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
    }
  }, [editor]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleWriteBlog = (data) => {
    // const blog = {
    //   title: data.title,
    //   category_name: "",
    //   details: content,
    //   views: "",
    //   status: "",
    //   date: "",
    //   author: {
    //     name: data.WriterName,
    //   },
    // };

    const blog = {
      userId: userid ,
      title: data.title,
      body: content,
      views: "",
      status: "",
    };

    console.log(blog)

    // Save blog information to the database

    fetch("http://100.25.166.88:8080/updateBlog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.like.blogId) {
          alert("Blog added successfully");
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
    <div className="write">
      <img
        className="writeImg"
        src="https://images.unsplash.com/photo-1575721697801-937774cc44ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <form onSubmit={handleSubmit(handleWriteBlog)} className="write-blog">
        <div className="flex justify-between">
          <section className="flex">
            <div>
              <input
                {...register("WriterName", { required: "Enter writer name" })}
                placeholder="Writer"
                name="WriterName"
                type="text"
                className="writer-details"
                autoFocus={true}
              />
              <br />
              {errors.WriterName && (
                <span className="text-red-500 text-xs">
                  {errors.WriterName.message}
                </span>
              )}
            </div>

            <div>
              <input
                {...register("category")}
                className="category"
                placeholder="Category"
                name="category"
                type="text"
                autoFocus={true}
              />
              {errors.category && (
                <span className="text-red-500 text-xs">
                  {errors.category.message}
                </span>
              )}
            </div>
          </section>

          {
            <button
              onClick={saving}
              className="writeSubmit all-btn"
              type="submit"
            >
              Publish
            </button>
          }
        </div>

        <div className="writeFormGroup">
          <input
            {...register("title", { required: "Enter title" })}
            id="title"
            className="writeInput"
            placeholder="Title"
            name="title"
            type="text"
            autoFocus={true}
          />
          <br />
          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}
        </div>

        <div className="text-area">
          <pre id="output"></pre>
          <div className="details-blog" id="editorjs" ></div>
        </div>
      </form>
    </div>
  );
};

export default Write;
