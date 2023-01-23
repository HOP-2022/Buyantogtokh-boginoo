import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './pages/App';
import reportWebVitals from './reportWebVitals';
import { Redirect } from './pages/Redirect';
import { History } from './components/History';
import { HistoryComp } from './components/HistoryComp';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPass } from './pages/ForgotPass';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },  
  {
    path:'/links/:id',
    element:<Redirect/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  },
   {
    path:'/forgotpass',
    element:<ForgotPass/>
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HistoryComp>
    <RouterProvider router = {router}/>
  </HistoryComp>
);

reportWebVitals();
