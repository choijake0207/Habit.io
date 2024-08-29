import React, { useContext } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import "./layout.css"

export default function PublicRootLayout() {
    const {authorizedUser} = useContext(AuthContext)
  return (
    <div className="public-root-layout">
        <nav className="public-nav">
            <p>Habit.io</p>
            {authorizedUser.authStatus ? 
              <div className="public-nav-a authorized-nav-a">
                <NavLink to="/dashboard">Go To Dashboard</NavLink>
              </div>
            :
              <div className="public-nav-a">
                <NavLink to="/register">Create Account</NavLink>
                <NavLink to="/login">Log In</NavLink>
              </div>
            }
        </nav>
        <Outlet/>
    </div>
  )
}
