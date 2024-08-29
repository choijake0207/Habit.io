import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import RootLayout from './Layouts/RootLayout'
import LandingPage from './Pages/LandingPage/LandingPage'
import LoginPage from './Pages/Login/LoginPage'
import "./App.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LandingPage/>}>
      <Route path="/login" element={<LoginPage/>}/>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
