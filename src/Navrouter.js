import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar/Navbar";
import Main from "./components/Layout/Main";


export const navrouter=createBrowserRouter([
    {
        path:'/*',
        element:<Navbar></Navbar>,
    }
])