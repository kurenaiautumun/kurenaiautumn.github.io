import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { navrouter } from './Navrouter';

function Nav() {
  return (
    <div className="Nav">
        <RouterProvider router={navrouter}></RouterProvider>
        <Toaster></Toaster>
    </div>
  );
}

export default Nav;