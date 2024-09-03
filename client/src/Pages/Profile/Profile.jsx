import React, { useEffect, useState } from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./profile.css"
import { fetchProfile } from '../../API/UserAPI'

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
          <h2>Your Information</h2>
          {profile && 
            <section className="profile-info">
              <div className="info-name">
                <label>First Name</label>
                <p>{profile.firstName}</p>
                <label>Last Name</label>
                <p>{profile.lastName}</p>
              </div>
              <label>Email</label>
              <p>{profile.email}</p>
              <label>Password</label>
              <p></p>
              <label>User Since</label>
              <p>{profile.createdAt}</p>
            </section>
          }
          <h2>Settings</h2>
          <section className="profile-settings">
            Settings
          </section>
        </div>
      }
    </PrivatePageWrap>
  )
}
