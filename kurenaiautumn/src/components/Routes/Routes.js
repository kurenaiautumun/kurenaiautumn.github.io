import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Others/About/About";
import Home from "../Others/Home/Home";
import Profile from "../Others/Profile/Profile";
import EditProfile from "../Others/EditProfile/EditProfile/EditProfile";
import Account from "../Others/EditProfile/Account/Account";
import BlogEdit from "../Blog/BlogEdit/BlogEdit";

import Blogs from "../Blogs/Blogs/Blogs";
import Details from "../Blogs/Details/Details";
import Signin from "../Signin/Signin"
import Signup from "../Signup/Signup";


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
                path:'/details',
                element:<Details></Details>
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
                path: '/editableBlog',
                element:<BlogEdit />,
                children:[{}]
            }
        ]
    }
])