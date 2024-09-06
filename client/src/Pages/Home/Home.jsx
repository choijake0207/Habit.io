import React, {useEffect, useState, useContext} from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./Home.css"
import {Plus, SquaresFour, FunnelSimple} from "phosphor-react"
import { fetchAllHabits } from '../../API/HabitAPI'
import HabitForm from '../../Components/Forms/HabitForm'
import HabitCard from '../../Components/Habit/HabitCard'
import { AuthContext } from '../../Context/AuthContext'
import { createHabit } from '../../API/HabitAPI'

export default function Home() {

  const [allHabits, setAllHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [formVisible, setFormVisible] = useState(false)
  const {authorizedUser} = useContext(AuthContext)

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

  const handleCreateHabit = async (name, startDate) => {
    const temporaryHabit = {
      name,
      startDate,
      id: "temporary"
    }
    setAllHabits(prev => [...prev, temporaryHabit])
    try {
      const response = await createHabit(name, startDate)
      const createdHabit = response.data
      setAllHabits(prev => prev.map(habit => 
        habit.id === temporaryHabit.id ? createdHabit : habit
      ))
      console.log(response)
    } catch (error) {
      setAllHabits(prev => prev.filter(habit => habit.id !== temporaryHabit.id))
      console.log(error)
    }
  }

  return (
    <PrivatePageWrap type={`Welcome ${authorizedUser.firstName}`}>
      <div className="page" id="home-page">
        <section className="daily-quote">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          </p>
        </section>
        <div className="habit-toolbar">
          <h2>Your Habits</h2>
          <div className="sort-and-filter">
            <div className="sort">
              <SquaresFour/>
              <p>Sort</p>
            </div>
            <div className="filter">
              <FunnelSimple/>
              <p>Filter</p>
            </div>
          </div>
        </div>

        <ul className="habit-container">
          {!loading && allHabits.length > 0 ? (
            allHabits.map(habit => {
              return (
                <HabitCard habit={habit}/>
              )
            })
          ) : (<p>No Habits Yet!</p>)
          }
        </ul>
        <button 
          className="add-habit-btn"
          onClick={() => setFormVisible(true)}
        >
          <Plus weight="fill"/>
        </button>
      </div>
      { formVisible && 
        <HabitForm
          toggleVisibility={() => setFormVisible(false)}
          createHabit={handleCreateHabit}
        />
      }


    </PrivatePageWrap>
  )
}
