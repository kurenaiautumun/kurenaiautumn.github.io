import React from "react";
import './Details.css'

const Details = () => {
  return (
    <div className="details-div mb-20">
      <h2 className="text-xl font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, et?
      </h2>
      <div className="flex mt-5">
      <img className='author-img mr-5' src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1674753568~exp=1674754168~hmac=e9bb323fadf786dcd26672d9f42e7b94271f0819e97a9e5ebbea54dd2fa3f40a" alt="author-img" />
        <p className="text-slate-400 text-sm mr-5">Author</p>
        <p className="text-slate-400 text-sm">Date</p>
      </div>

    
      <img
        className="details-img my-7"
        src="https://images.unsplash.com/photo-1674755615363-f0c5653beb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt=""
      />
     

      <p className="blog-content text-sm mb-16">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
        aspernatur eligendi reprehenderit eaque, omnis quis dicta ut, aut ipsum
        maiores dolore numquam ipsa vero ab impedit, sapiente tempora possimus
        corrupti!Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Officiis aspernatur eligendi reprehenderit eaque, omnis quis dicta ut,
        aut ipsum maiores dolore numquam ipsa vero ab impedit, sapiente tempora
        possimus corrupti!Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Officiis aspernatur eligendi reprehenderit eaque, omnis quis dicta
        ut, aut ipsum maiores dolore numquam ipsa vero ab impedit, sapiente
        tempora possimus corrupti!
      </p>
    </div>
  );
};

export default Details;
