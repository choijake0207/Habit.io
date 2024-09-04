import React, { useContext } from 'react'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom"
import RootLayout from './Layouts/RootLayout'
import LandingPage from './Pages/LandingPage/LandingPage'
import LoginPage from './Pages/Login/LoginPage'
import Register from './Pages/Register/Register'
import { AuthProvider } from './Context/AuthContext'
import { AuthContext } from './Context/AuthContext'
import "./App.css"
import PublicRootLayout from './Layouts/PublicRootLayout'
import Home from './Pages/Home/Home'
import Insights from './Pages/Insights/Insights'
import Profile from './Pages/Profile/Profile'
import SingleHabitPage from './Pages/SingleView/SingleHabitPage'

const PrivateRoutes = ({element}) => {
  const {authorizedUser, loading} = useContext(AuthContext)
  if (loading) {
    return null
  }
  return authorizedUser.authStatus ? element : <Navigate to="/login"/>
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PublicRootLayout/>}>
        <Route index element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>

      <Route element={<PrivateRoutes element={<RootLayout/>}/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/insights" element={<Insights/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/habit/:id" element={<SingleHabitPage/>}/>
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
