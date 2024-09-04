import React, {useContext} from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {House, ClipboardText, User, SignOut} from "phosphor-react"
import "./layout.css"
import {AuthContext} from "../Context/AuthContext"

export default function RootLayout() {
  const {logout} = useContext(AuthContext)
  return (
    <div className="root-layout">
      <div className="user-nav-wrap">
        <nav className='user-nav'>
          <div className="user-nav-a">
            <NavLink to="/home">
              {({isActive}) => (
                <House weight={isActive ? "fill" : "regular"}/>
              )}
              
            </NavLink>
            <NavLink to="/insights">
              {({isActive}) => (
                <ClipboardText weight={isActive ? "fill" : "regular"}/>
              )}
            </NavLink>
            <NavLink to="/profile">
              {({isActive}) => (
                <User weight={isActive ? "fill" : "regular"}/>
              )}
            </NavLink>
          </div>
          <button 
            className="sign-out-btn"
            onClick={logout}
          ><SignOut/></button>
        </nav>
        </div>
      <Outlet/>
    </div>
  )
}
