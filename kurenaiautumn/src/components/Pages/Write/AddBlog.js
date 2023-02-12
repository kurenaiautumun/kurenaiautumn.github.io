import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import "./Write.css";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";

const AddBlog = () => {
  // const Header = require('@editorjs/header');
  // Editor code
  const [array, setArray] = useState([]);

  function saving() {
    const output = document.getElementById("output");
    editor.save().then((savedData) => {
      output.innerHTML = JSON.stringify(savedData, null, 4);
      console.log(savedData)
      savedData?.blocks?.map((a) => console.log(a?.data?.text))
      setArray(savedData?.blocks?.map((a) => a?.data?.text));
    });
  }

  let content = array.join('</br></br>');
  console.log(content);

  let editor = { isReady: false };
  

  useEffect(() => {
    // 
    if (!editor.isReady) {
      editor = new EditorJS({
        autofocus: true,
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author'
            }
          },
        }
      });
    }
  }, []);  
  
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleWriteBlog = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const blog = {
            title: data.title,
            category_name: "",
            image_url: imgData.data.url,
            details: content,
            views: "",
            status: "",
            date: "",
            author: {
              name: data.WriterName,
            },
          };

          // Save blog information to the database

    
            fetch("http://localhost:5000/blogs", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(blog),
          })
            .then((res) => res.json())
            .then((data) => {
              if(data.acknowledged){
                alert("Blog added successfully")
              }
            })
            .catch((err) => console.error(err));
        }
      });
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.unsplash.com/photo-1575721697801-937774cc44ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
    <form onSubmit={handleSubmit(handleWriteBlog)} className="writeForm">
    <div className="flex justify-between">
   <section>
   <input
        {...register("WriterName", { required: "Enter writer name" })}
        placeholder="Writer"
        name="WriterName"
        type="text"
        className="writer-details"
        autoFocus={true}
      />
      {errors.WriterName && (
        <span className="text-red-500">{errors.WriterName.message}</span>
      )}

      <input
        {...register("category")}
        className="category"
        placeholder="Category"
        name="category"
        type="text"
        autoFocus={true}
      />
      {errors.category && (
        <span className="text-red-500">{errors.category.message}</span>
      )}
   </section>

{
<button onClick={saving} className="writeSubmit all-btn" type="submit">
        Publish
      </button>
}
    </div>

      <div className="writeFormGroup">
        <label htmlFor="fileInput">
          <i className="writeIcon fas fa-plus"></i>
        </label>
        <input
          {...register("image")}
          id="fileInput"
          name="image"
          type="file"
          style={{ display: "none" }}
        />
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}

<input
          {...register("title", { required: "Enter title" })}
          id="title"
          className="writeInput"
            placeholder="Title"
            name="title"
            type="text"
            autoFocus={true}
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
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

export default AddBlog;
