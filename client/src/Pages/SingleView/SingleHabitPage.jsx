import React, { useState, useEffect } from 'react'
import {fetchSingleHabit} from "../../API/HabitAPI"
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./SingleHabitPage.css"
import { useParams } from 'react-router-dom'
import Timer from '../../Components/Timer/Timer'

export default function SingleHabitPage() {
  const {id} = useParams()
  const [habit, setHabit] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await fetchSingleHabit(id)
        setHabit(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHabit()
  }, [])

  return (
    <PrivatePageWrap type={"single"}>
      {!loading && <div className="page" id="single-habit-page">
        <section className="habit-summary">
          <h1>{habit.name}</h1>
          <h2>Current Streak</h2>
          <div className="summary-timer">
            <Timer
              start={habit.startDate}
            />
          </div>
          <p>{habit.startDate}</p>
        </section>
        <section className="habit-stats">
          <h2>Stats</h2>
          <div className="stats-container">
            <div className="resets">
              <p>{habit.streaks.length}</p>
              <label>Resets</label>
            </div>
            <div className="total-lapse">
              <p>0</p>
              <label>Since Start</label>
            </div>
            <div className="longest-streak">
              <p>0</p>
              <label>Longest Streak</label>
            </div>
            <div className="avg-streak">
              <p>0</p>
              <label>Average Streak</label>
            </div>
          </div>
        </section>

      </div>}
    </PrivatePageWrap>
  )
}
