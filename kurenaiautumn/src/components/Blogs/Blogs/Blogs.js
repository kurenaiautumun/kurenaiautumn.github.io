import React from 'react';
import Blog from '../Blog/Blog';
import './Blogs.css'

const Blogs = () => {
    const { data: blogs =[] ,isLoading ,refetch} = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
          const result = await fetch("https://kurenaiautumn-server.vercel.app/blogs");
          const data = await result.json();
          return data;
        },
      });
      
      if(isLoading){
        return <>Loading...</>
      }


    return (
        <div className='blogs'>
            <p className='heading mb-2 text-3xl font-bold'>Recent Posts</p>
            <hr className='mb-10'/>
            <Blog></Blog>
            <Blog></Blog>
            <Blog></Blog>
        </div>
    );
};

export default Blogs;