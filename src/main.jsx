import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Taskpage from './Taskpage';
import Outlet from './Layout/Outlet';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Context/AuthContext';
import { TimerProvider } from './Context/TimerContex';
import ForgotPassword from '../components/Auth/forgot-password';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
//import PrivateRoute from '../components/Auth/PrivateRoute';
import Dashboard from '../components/Auth/Dashboard';
import UpdateProfile from '../components/Auth/update-profile';
import { Music } from './Music';
import { PlayerProvider } from './Context/PlayerContext';
//import Db from '../components/Db';
import DatabaseProvider from './Context/DbContext';
import VersionPage from './version';


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
                },
                {
                  path: "/version",
                  element: <VersionPage/>,
                },
                {
                  path: "/forgot-password",
                  element: <ForgotPassword/>,
                },
                {
                  path: "/login",
                  element: <Login/>,
                },
                {
                  path: "/signup",
                  element: <Signup/>,
                },
                            {
                              path: "/dashboard",
                              //element: <PrivateRoute/>,
                              children: [
                                {
                                  index: true,
                                  element: <Dashboard />,
                                },
                            ],
                },
                {
                  path: "/update-profile",
                  element: <UpdateProfile/>,
                },
                {
                  path: "/Music",
                  element: <Music/>,
                }
                // {
                //   path: "/db",
                //   element: <Db/>,
                // }
              ]}

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    {/* <App /> */}

    <DatabaseProvider>
    <AuthProvider>
    <PlayerProvider>
    <TimerProvider>
   
    <RouterProvider router={router} />
    </TimerProvider>
    </PlayerProvider>
    </AuthProvider>
    </DatabaseProvider>

    </>
)
