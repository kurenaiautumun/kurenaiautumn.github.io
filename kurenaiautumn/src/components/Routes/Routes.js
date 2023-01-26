import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Others/About/About";
import Home from "../Others/Home/Home";
import Profile from "../Others/Profile/Profile";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children: [
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
            }
        ]
    }
])