import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Nav from './Nav';

import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient()

const navbar = ReactDOM.createRoot(document.getElementById("navbar"));
navbar.render(
  <React.StrictMode>
     <Nav />
  </React.StrictMode>
);

//ReactDOM.render(<Nav/>, document.getElementById('navbar'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <App />
     </QueryClientProvider>
  </React.StrictMode>
);

//ReactDOM.render(<App/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
