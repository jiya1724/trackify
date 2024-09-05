import React from 'react'
import Landing from '../Pages/Landing'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import ConfirmAttendance from '../Pages/ConfirmAttendance.jsx'
import Credentials from '../Pages/Credentials.jsx'
import Home from '../Pages/Home.jsx'
import Locations from '../Pages/Locations.jsx'
import LeaveRequests from '../Pages/LeaveRequests.jsx'

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
        path : "/confirmattendance",
        element: <ConfirmAttendance/>,
    },
    {
        path : "/credentials",
        element: <Credentials/>,
    },
    {
        path : "/home",
        element: <Home/>,
    },
    {
        path : "/locations",
        element: <Locations/>,
    },
    {
        path:"/leaverequests",
        element:<LeaveRequests/>
    }

    
    
];
export default routes;