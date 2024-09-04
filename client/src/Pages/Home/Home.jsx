import React, {useEffect, useState} from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./Home.css"
import {Plus} from "phosphor-react"
import { fetchAllHabits, createHabit } from '../../API/HabitAPI'
export default function Home() {

  const [allHabits, setAllHabits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetchAllHabits()
        setAllHabits(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchHabits()
  }, [])


  return (
    <PrivatePageWrap type={"Welcome Back"}>
      <div className="page" id="home-page">
        <section className="daily-quote">

        </section>
        <ul className="habit-container">
          {!loading && allHabits.length > 0 ? (
            allHabits.map(habit => {
              return (
                <li className="habit">
                  <p>{habit.name}</p>
                </li>
              )
            })
          ) : (<p>No Habits Yet!</p>)
          }
        </ul>
       <button className="add-habit-btn"><Plus weight="fill"/></button>
      </div>


    </PrivatePageWrap>
  )
}
