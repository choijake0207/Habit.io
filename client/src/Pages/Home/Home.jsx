import React, {useEffect, useState, useContext} from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./Home.css"
import {Plus} from "phosphor-react"
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
    try {
      const response = await createHabit(name, startDate)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PrivatePageWrap type={`Welcome ${authorizedUser.firstName}`}>
      <div className="page" id="home-page">
        <section className="daily-quote">

        </section>
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
