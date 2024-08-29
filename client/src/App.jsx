import React, { useContext } from 'react'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom"
import RootLayout from './Layouts/RootLayout'
import LandingPage from './Pages/LandingPage/LandingPage'
import LoginPage from './Pages/Login/LoginPage'
import Register from './Pages/Register/Register'
import { AuthProvider } from './Context/AuthContext'
import { AuthContext } from './Context/AuthContext'
import "./App.css"

const PrivateRoutes = ({element}) => {
  const {authorizedUser} = useContext(AuthContext)
  return authorizedUser.status ? element : <Navigate to="/login"/>
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>

      <Route element={<PrivateRoutes element={<RootLayout/>}/>}>
        <Route/>
      </Route>
    </>
  )
)

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider> 
    
  )
}
