import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './components/Routes/Routes';

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
    </div>
  );
}

export default App;

//import * as React from "react";
//import {
//  BrowserRouter as Router,
//  Route,
//  Routes,
//} from "react-router-dom";
//
//
//function Post() {
//  const { id } = useParams();
//  return (<div>{id}</div>);
//}
//
//
//export default function App() {
//  return (
//    <Router>
//      <Routes>
//        <Route
//          path="/"
//          element={""}
//        />
//        <Route
//          path="blog/:id"
//          element={<Post />}
//        />
//      </Routes>
//    </Router>
//  );
//}