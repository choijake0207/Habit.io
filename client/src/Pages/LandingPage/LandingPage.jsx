import React, { useContext } from 'react'
import Contact from '../../Components/LandingComp/Contact'
import Quote from '../../Components/LandingComp/Quote'
import Statement from '../../Components/LandingComp/Statement'
import WalkThrough from '../../Components/LandingComp/WalkThrough'
import "./Landing.css"
import {NavLink} from "react-router-dom"
import { AuthContext } from '../../Context/AuthContext'

export default function LandingPage() {
  const {authorizedUser} = useContext(AuthContext)
  return (
    <div className="landing-page">
        <nav className="landing-nav">
            <p>Habit.io</p>
            {authorizedUser.authStatus ? 
              <div className="landing-nav-a authorized-nav-a">
                <NavLink>Go To Dashboard</NavLink>
              </div>
            :
              <div className="landing-nav-a">
                <NavLink to="/register">Create Account</NavLink>
                <NavLink to="/login">Log In</NavLink>
              </div>
            }
        </nav>
        <Quote/>
        <Statement/>
        <WalkThrough/>
        <Contact/>
    </div>
  )
}
