import React from "react";
import { useLoaderData } from "react-router-dom";
import './Details.css';
import parse from 'html-react-parser'

const Details = () => {
  const blogDetails= useLoaderData();
  const {title,image_url,details,author}=blogDetails;
  
  return (
    <div className="details-div mb-20">
      <h2 className='blog-title text-xl font-semibold'>{title}</h2>
      <div className="flex mt-5">
      {/* <img className='author-img mr-5' src="" /> */}
        <p className="text-slate-400 text-sm mr-5">{author?.name}</p>
        {/* <p className="text-slate-400 text-sm">Date</p> */}
      </div>

    
      <img
        className="details-img my-7"
        src={image_url}
        alt=""
      />
     

      <p className="blog-details text-sm mb-16">
      {parse(details)}
      </p>
    </div>
  );
};

export default Details;
