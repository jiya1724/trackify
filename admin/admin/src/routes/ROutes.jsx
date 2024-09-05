import React from 'react'
import Landing from '../Pages/Landing'
import Login from '../Pages/Login';
import Register from '../Pages/Register'
import ConfirmAttendance from '../Pages/ConfirmAttendance.jsx'

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
    
    
];
export default routes;