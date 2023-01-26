import { RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Others/Home/Home';
import { router } from './components/Routes/Routes';

function App() {
  return (
    <div className="App">
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
