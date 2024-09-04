import React from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./Home.css"
export default function Home() {
  return (
    <PrivatePageWrap type={"Home"}>
      <div className="page" id="home-page">
        <section className="daily-quote">

        </section>
        <ul className="habit-container">
          <li className="habit">Habit 1</li>
          <li className="habit">Habit 2</li>
          <li className="habit">Habit 3</li>
          <li className="habit">Habit 4</li>
          <li className="habit">Habit 4</li>
          <li className="habit">Habit 4</li>
          <li className="habit">Habit 4</li>
          <li className="habit">Habit 4</li>
          <li className="habit">Habit 4</li>

        </ul>
        <section className="home-widgets">
          <div className="widget">Widget</div>
        </section>
      </div>


    </PrivatePageWrap>
  )
}
