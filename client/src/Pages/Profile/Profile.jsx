import React, { useContext, useEffect, useState } from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./profile.css"
import { fetchProfile } from '../../API/UserAPI'
import {AuthContext} from "../../Context/AuthContext"

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfileRequest = async () => {
      try {
        const response = await fetchProfile()
        setProfile(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfileRequest()
  }, [])


  return (
    <PrivatePageWrap type={"Profile"}>
      {!loading &&
        <div className="page" id="profile-page">
          
          {profile && 
            <section className="profile-info">
              <header className="info-header">
                <h2>Your Information</h2>
              </header>
        
              <div className="info-detail">
                <div className="info-firstName">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    disabled
                  />
                </div>
                <div className="info-lastName">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    disabled
                  />
                </div>
                <div className="info-email">
                  <label>Email:</label>
                  <input
                    type="text"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div className="info-password">
                  <label>Password:</label>
                  <button>Change Password</button>
                </div>
              </div>
            </section>
          }
       
          <section className="profile-settings">
            <h2>Settings</h2>
            Settings
          </section>
        </div>
      }
    </PrivatePageWrap>
  )
}
