import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Others/About/About";
import Home from "../Others/Home/Home";
import Profile from "../Others/Profile/Profile";
<<<<<<< HEAD
import EditProfile from "../Others/EditProfile/EditProfile/EditProfile";
import Account from "../Others/EditProfile/Account/Account";
//import BlogEdit from "../Blog/BlogEdit/BlogEdit";

=======
>>>>>>> d9d4dee3f2448a6a0dbba6b47923a05a6dfa4a69
import Blogs from "../Blogs/Blogs/Blogs";
import Details from "../Blogs/Details/Details";
import Signin from "../Signin/Signin"
import Signup from "../Signup/Signup";
import Write from "../Pages/Write/Write";

import Editor from "../TextEditor/TextEditor";


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
                element:<Signin></Signin>,
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
            }
        ]
    }
])