import React, {useEffect, useState, useContext} from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./Home.css"
import {Plus, SquaresFour, FunnelSimple} from "phosphor-react"
import { fetchAllHabits } from '../../API/HabitAPI'
import HabitForm from '../../Components/Forms/HabitForm'
import HabitCard from '../../Components/Habit/HabitCard'
import { AuthContext } from '../../Context/AuthContext'
import { createHabit } from '../../API/HabitAPI'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const [allHabits, setAllHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [formVisible, setFormVisible] = useState(false)
  const navigate = useNavigate()
  const [filter, setFilter] = useState("newest")
  const [sort, setSort] = useState("all")

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



  const handleCreateHabit = async (name, startDate, color) => {
    const temporaryHabit = {
      name,
      startDate,
      color,
      id: "temporary"
    }
    setAllHabits(prev => [...prev, temporaryHabit])
    try {
      const response = await createHabit(name, startDate, color)
      const createdHabit = response.data
      navigate(`/habit/${response.data.id}`)
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
    <PrivatePageWrap type="Home">
      <div className="page" id="home-page">
        <div className="habit-toolbar">
          <h2>Your Habits</h2>
          <div className="sort-and-filter">
            <div className="sort">
              <SquaresFour/>
              <select>
                <option disabled hidden value="">Sort</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <div className="filter">
              <FunnelSimple/>
              <select>
                <option disabled hidden>Filter</option>
                <option value="all">All</option>
                <option value="ongoing">On Going</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        {!loading && allHabits.length > 0 ? (
          <ul className="habit-container">
            {allHabits.map(habit => {
                return (
                  <HabitCard 
                    habit={habit}
                    key={habit.id}
                  />
                )
              })}
          </ul>
        ) : (
          <div className="empty-container">
            <h3>No Habits Created Yet</h3>
          </div>
        )}

        <button 
          className="add-habit-btn"
          onClick={() => setFormVisible(true)}
        >
          <Plus weight="fill"/>
        </button>
      </div>
      { formVisible && 
        <HabitForm
          createHabit={handleCreateHabit}
          onClose={() => setFormVisible(false)}
        />
      }
    </PrivatePageWrap>
  )
}
