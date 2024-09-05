import React from 'react'
import Landing from '../Pages/Landing'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import ConfirmAttendance from '../Pages/ConfirmAttendance.jsx'
import Credentials from '../Pages/Credentials.jsx'


const routes =[
    {
        path : "/",
        element: <Landing/>
    },
    {
        path : "/auth",
        element: <Login/>,
    },
    {
        path : "/register",
        element: <Register/>,
    },
    {
        path : "/confirmAttendance",
        element: <ConfirmAttendance/>,
    },
    {
        path : "/credentials",
        element: <Credentials/>,
    },

    
    
];
export default routes;