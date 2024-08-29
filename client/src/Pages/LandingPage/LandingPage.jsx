import React, { useContext } from 'react'
import Contact from '../../Components/LandingComp/Contact'
import Quote from '../../Components/LandingComp/Quote'
import Statement from '../../Components/LandingComp/Statement'
import WalkThrough from '../../Components/LandingComp/WalkThrough'
import "./Landing.css"


export default function LandingPage() {
  return (
    <div className="landing-page">
        <Quote/>
        <Statement/>
        <WalkThrough/>
        <Contact/>
    </div>
  )
}
