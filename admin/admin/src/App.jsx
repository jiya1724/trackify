import React from 'react'
import routes from '../src/routes/ROutes'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'



const App = () => {
  const routings = createBrowserRouter(routes);
  return (
    <div>
     
        <RouterProvider router={routings}></RouterProvider>
   
    </div>
  )
}

export default App