import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Taskpage from './Taskpage';
import Outlet from './Layout/Outlet';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { TimerProvider } from './Context/TimerContex';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet/>,
    children: [{
                  path: "/",
                  element: <App/>,
                },
                {
                  path: "/taskpage",
                  element: <Taskpage/>,
                },]}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <TimerProvider>
    <RouterProvider router={router} />
    </TimerProvider>
  </React.StrictMode>,
)
