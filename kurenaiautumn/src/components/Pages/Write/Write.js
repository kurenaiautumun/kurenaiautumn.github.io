import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import "./Write.css";


const Write = () => {
  
  
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const config = {
    placeholder: "Start typing...",
    buttons: [
      'bold',
      'strikethrough',
      'underline',
      'italic', '|',
      'ul',
      'ol', '|',
      'fontsize',
      'image',
  ],
  };
  console.log(content);

  const handleOnsubmit = (event) => {
    const form = event.target;
    const title = form.title.value;
    const image = form.image.value;
    const name=form.WriterName.value

    console.log(image)

    const blog = {
      writer: name,
      title: title,
      category_name: "",
      image_url: image,
      details: content,
      views: "",
      status: "",
      date: "",
      author: {
        name: "",
      },
    };

    console.log(blog);

    fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.unsplash.com/photo-1575721697801-937774cc44ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
      <form onSubmit={handleOnsubmit} className="writeForm">
      <div className="">
        <input
            className="writer-details"
            placeholder="Writer"
            name="WriterName"
            type="text"
            autoFocus={true}
          />
        <input
            className="category"
            placeholder="Category"
            name="category"
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            name="image"
            type="file"
            style={{ display: "none" }}
          />
          <input
            className="writeInput"
            placeholder="Title"
            name="title"
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="text-area">
          {/* <input
            className="writeText"
            placeholder="Tell your story..."
            type="textarea"
            autoFocus={true}
          /> */}
          <JoditEditor
          className="text-editor"
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </div>
        

        <button className="writeSubmit all-btn" type="submit">
          Publish
        </button>
        <p></p>
      </form>
      
    </div>
  );
};

export default Write;
