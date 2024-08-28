import React from 'react'
import {createBrowserRouter, createRouterFromElements, Route, RouterProvider} from "react-router-dom"
import LandingPage from './Pages/LandingPage/LandingPage'

const router = createBrowserRouter(
  createRouterFromElements(
    <Route path="/" element={LandingPage}>

    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
