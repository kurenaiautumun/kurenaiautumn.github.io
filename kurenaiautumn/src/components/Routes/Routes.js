import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Others/About/About";
import Home from "../Others/Home/Home";
import Profile from "../Others/Profile/Profile";
import Blogs from "../Blogs/Blogs/Blogs";
import Details from "../Blogs/Details/Details";
import Signin from "../Signin/Signin"
import Signup from "../Signup/Signup";
import Write from "../Pages/Write/Write";
import Dashboard from "../Dashboard/dashboard";


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
                path: '/write',
                element:<Write></Write>
            },
            {
                path: '/profile',
                element:<Profile></Profile>,
                children:[
                    {
                        path:'/profile',
                        element:<Home></Home>,
                        loader: ()=> fetch(`https://kurenaiautumn-server.vercel.app/blogs`),
                    },
                    {
                        path: '/profile/about',
                        element: <About></About>
                    }
                ]
            },
            {
                path: "/dashboard",
                element:<Dashboard />
            }
        ]
    }
])