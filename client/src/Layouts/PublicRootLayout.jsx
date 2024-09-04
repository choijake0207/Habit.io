import React, { useContext } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import "./layout.css"

export default function PublicRootLayout() {
    const {authorizedUser} = useContext(AuthContext)
    const navigate = useNavigate()
  return (
    <div className="public-root-layout">
        <nav className="public-nav">
            <p onClick={(e) =>navigate("/") }>Habit.io</p>
            {authorizedUser.authStatus ? 
              <div className="public-nav-a authorized-nav-a">
                <NavLink to="/home">Go To Portal</NavLink>
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
