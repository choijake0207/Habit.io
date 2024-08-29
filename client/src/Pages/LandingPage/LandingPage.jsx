import React from 'react'
import Contact from '../../Components/LandingComp/Contact'
import Quote from '../../Components/LandingComp/Quote'
import Statement from '../../Components/LandingComp/Statement'
import WalkThrough from '../../Components/LandingComp/WalkThrough'
import "./Landing.css"
import {NavLink} from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="landing-page">
        <nav className="landing-nav">
            <p>Habit.io</p>
            <div className="landing-nav-a">
                <NavLink to="/register">Create Account</NavLink>
                <NavLink to="/login">Log In</NavLink>
            </div>
        </nav>
        <Quote/>
        <Statement/>
        <WalkThrough/>
        <Contact/>
    </div>
  )
}
