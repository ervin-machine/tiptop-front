import React from 'react'
import './profileCard.scss'

function ProfileCard({ children }) {
  return (
    <div className='profile-card-content'>{ children }</div>
  )
}

export default ProfileCard