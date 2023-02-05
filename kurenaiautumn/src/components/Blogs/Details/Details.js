import React from "react";
import { useLoaderData } from "react-router-dom";
import './Details.css';
import image1 from '../../Images/image1.jpeg'

const Details = () => {
  const blogDetails= useLoaderData();
  const {_id,image_url,title,details,author}=blogDetails;
  console.log(_id);
  return (
    <div className="details-div mb-20">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
      <div className="flex mt-5">
      {/* <img className='author-img mr-5' src="" /> */}
        <p className="text-slate-400 text-sm mr-5">{author.name}</p>
        {/* <p className="text-slate-400 text-sm">Date</p> */}
      </div>

    
      <img
        className="details-img my-7"
        src={image1}
        alt=""
      />
     

      <p className="blog-details text-sm mb-16">
        {details}
      </p>
    </div>
  );
};

export default Details;
