import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import RootLayout from './Layouts/RootLayout'
import LandingPage from './Pages/LandingPage/LandingPage'
import LoginPage from './Pages/Login/LoginPage'
import Register from './Pages/Register/Register'
import { AuthProvider } from './Context/AuthContext'
import "./App.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<Register/>}/>
    </Route>
  )
)

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider> 
    
  )
}
