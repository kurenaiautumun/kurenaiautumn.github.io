import React from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import Blog from "../Blog/Blog";
import "./Blogs.css";

const Blogs = () => {
  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const result = await fetch("http://localhost:5000/blogs");
      const data = await result.json();
      return data;
    },
  });
 

  if (isLoading) {
    return <>Loading...</>;
  }

  // save blog
  const handleSaveButton = (id) => {
    fetch(`http://localhost:5000/blog/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ isSaved: "Saved" }),
    })
    .then(res => res.json())
    .then(data =>{
      if(data.modifiedCount >0){
        toast.success("Blog saved successfully")
      }
    })
  };

  // unsave blog
  const handleUnsaveButton = (id) => {
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ isSaved: "unsaved" }),
    })
    .then(res => res.json())
    .then(data =>{
      alert("Do you want to unsave blog?")
    })
  };

  return (
    <div className="blogs">
      <p className="heading mb-2 text-3xl font-bold">Recent Posts</p>
      <hr className="mb-10" />
      {blogs?.map((blog) => (
        <Blog blog={blog} key={blog._id} handleSaveButton={handleSaveButton} handleUnsaveButton={handleUnsaveButton} refetch={refetch}></Blog>
      ))}
    </div>
  );
};

export default Blogs;
