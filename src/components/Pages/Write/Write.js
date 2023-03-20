import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import "./Write.css";
import Header from "@editorjs/header";
import useTitle from "../../hooks/useTItle";
import ImageTool from '@editorjs/image';
// import Quote from "@editorjs/quote";

const Write = () => {
  const [array, setArray] = useState([]);
  useTitle("Write");

  let editor = { isReady: false };

  function saving() {
    const output = document.getElementById("output");
    editor.save().then((savedData) => {
      output.innerHTML = JSON.stringify(savedData, null, 4);
      console.log(savedData);
      savedData?.blocks?.map((a) => console.log(a?.data?.text));
      setArray(savedData?.blocks?.map((a) => a?.data?.text));
    });
  }

  let content = array.join("</br></br>");
  console.log(content);

  useEffect(() => {
    //
    if (!editor.isReady) {
      editor = new EditorJS({
        autofocus: true,
        holder: "editorjs",
        tools: {
          // header: {
          //   class: Header,
          //   shortcut: "CMD+SHIFT+H",
          // },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'http://127.0.0.1:3000/image', // Your backend file uploader endpoint
                byUrl: 'http://127.0.0.1:3000/image', // Your endpoint that provides uploading by Url
              },
              additionalRequestData: {
                "userId": 'asdas',
                "blogId": "12345"
              },
            }
          }
          //   quote: {
          //     class: Quote,
          //     inlineToolbar: true,
          //     config: {
          //       quotePlaceholder: 'Enter a quote',
          //       captionPlaceholder: 'Quote\'s author'
          //     }
          //   },
        },
      });
    }
  }, []);

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
      userId: "63de7505c2944a7630ad9ae0",
      title: data.title,
      body: content,
      views: "",
      status: "",
    };

    console.log(blog)

    // Save blog information to the database

    fetch(`${process.env.REACT_APP_URL}/updateBlog`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Blog added successfully");
        }
      })
      .catch((err) => console.error(err));
  };
gi
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
      <button onClick={prints}>
        Hello
      </button>
      <form onSubmit={handleSubmit(handleWriteBlog)} className="writeForm">
      <button onClick={prints}>
        Hello
      </button>
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
          <div id="editorjs" value={content}></div>
        </div>
      </form>
    </div>
  );
};

export default Write;
