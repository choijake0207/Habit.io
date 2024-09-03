import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {House, ChartBar, User, SignOut} from "phosphor-react"
import "./layout.css"

export default function RootLayout() {
  return (
    <div className="root-layout">
        <nav className='user-nav'>
          <div className="user-nav-a">
            <NavLink to="/home"><House/></NavLink>
            <NavLink to="/insights"><ChartBar/></NavLink>
            <NavLink to="/profile"><User/></NavLink>
          </div>
          <button className="sign-out-btn"><SignOut/></button>
        </nav>
        <Outlet/>
    </div>
  )
}
