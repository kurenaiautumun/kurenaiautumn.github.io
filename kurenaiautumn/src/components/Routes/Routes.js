import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Others/About/About";
import Home from "../Others/Home/Home";
import Profile from "../Others/Profile/Profile";
import EditProfile from "../Others/EditProfile/EditProfile/EditProfile";
import Account from "../Others/EditProfile/Account/Account";
//import BlogEdit from "../Blog/BlogEdit/BlogEdit";

import Blogs from "../Blogs/Blogs/Blogs";
import Details from "../Blogs/Details/Details";
import Signin from "../Signin/Signin"
import Signup from "../Signup/Signup";
import AddBar from "../editBlog/AddBar/AddBar";
import BlogComp from "../editBlog/BlogComponent/BlogComp";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children: [
            {
                path:'/',
                element:<Blogs></Blogs>
            },
            {
                path:'/blog/:id',
                element:<Details></Details>,
                loader: ({params})=> fetch(`https://kurenaiautumn-server.vercel.app/blog/${params.id}`)
            },
            {
                path:'/signin',
                element:<Signin></Signin>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            },
            {
                path: '/profile',
                element:<Profile></Profile>,
                children:[
                    {
                        path:'/profile',
                        element:<Home></Home>
                    },
                    {
                        path: '/profile/about',
                        element: <About></About>
                    }
                ]
            },
            {
                path: '/editprofile',
                element:<EditProfile></EditProfile>,
                children:[
                    {
                        path: '/editprofile',
                        element:<Account></Account>
                    }
                ]
            },
            {
                path: '/editblog',
                element:<BlogComp></BlogComp>
            }
        ]
    }
])