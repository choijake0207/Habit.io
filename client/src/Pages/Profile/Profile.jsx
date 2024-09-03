import React from 'react'
import PrivatePageWrap from '../../Layouts/PrivatePageWrap'
import "./profile.css"

export default function Profile() {
  return (
    <PrivatePageWrap type={"Profile"}>
      <div className="page" id="profile-page">
        <h2>Your Information</h2>
        <section className="profile-info">
          Information
        </section>
        <h2>Settings</h2>
        <section className="profile-settings">
          Settings
        </section>
      </div>
    </PrivatePageWrap>
  )
}
