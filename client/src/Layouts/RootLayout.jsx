import React, {useContext} from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {House, ChartBar, User, SignOut} from "phosphor-react"
import "./layout.css"
import {AuthContext} from "../Context/AuthContext"

export default function RootLayout() {
  const {logout} = useContext(AuthContext)
  return (
    <div className="root-layout">
        <nav className='user-nav'>
          <div className="user-nav-a">
            <NavLink to="/home"><House/></NavLink>
            <NavLink to="/insights"><ChartBar/></NavLink>
            <NavLink to="/profile"><User/></NavLink>
          </div>
          <button 
            className="sign-out-btn"
            onClick={logout}
          ><SignOut/></button>
        </nav>
        <Outlet/>
    </div>
  )
}
