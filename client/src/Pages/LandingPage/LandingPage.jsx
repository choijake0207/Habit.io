import React from 'react'
import Contact from '../../Components/LandingComp/Contact'
import Quote from '../../Components/LandingComp/Quote'
import Statement from '../../Components/LandingComp/Statement'
import WalkThrough from '../../Components/LandingComp/WalkThrough'
import "./Landing.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
        <nav className="landing-nav">
            <h1>Habit.IO</h1>
            <div className="landing-nav-btn">
                <button>Create Account</button>
                <button>Log In</button>
            </div>
        </nav>
        <Quote/>
        <Statement/>
        <WalkThrough/>
        <Contact/>
    </div>
  )
}
