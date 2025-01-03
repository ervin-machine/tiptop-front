import React, { useState } from 'react'

import ProfileCard from '../../../../components/profileCard'
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import EditProfile from '../editProfile';
import ChangePassword from '../changePassword';

function ProfileInfo({ user, updateUser, updatePassword }) {
  const [open, setOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true)
  }

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false)
  }

  return (
    <div className='profile-info-container'>
      <ProfileCard>
        <div className='profile-info-content'>
          <div>
            <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </div>
          <div className='ml-20'>
            <p className='profile-head'>{user?.firstName} {user?.lastName}</p>
            <p className='profile-subhead'>{user?.companyPosition}</p>
            <p className='profile-text'>{user?.companyName}</p>
          </div>
        </div>
      </ProfileCard>
      
      <ProfileCard>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 className='profile-card-head'>Profile information</h3>
          <Button onClick={handleOpen}><EditIcon sx={{ color: "#1976d2"}} /></Button>
        </div>
        
        <div className='profile-information'>
          <div>
            <div>
              <p className='profile-info-head'>First Name</p>
              <p className='profile-info-text'>{user?.firstName}</p>
            </div>
            <div>
              <p className='profile-info-head'>Email address</p> 
              <p className='profile-info-text'>{user?.email}</p>
            </div>
            <div>
              <p className='profile-info-head'>Company</p>
              <p className='profile-info-text'>{user?.companyName}</p>
            </div>

          </div>
          <div>
            <div>
              <p className='profile-info-head'>Last Name</p>
              <p className='profile-info-text'>{user?.lastName}</p>
            </div>
            <div>
              <p className='profile-info-head'>Phone</p>
              <p className='profile-info-text'>{user?.phone}</p>
            </div>
            <div>
              <p className='profile-info-head'>Company Position</p>
              <p className='profile-info-text'>{user?.companyPosition}</p>
            </div>
          </div>
        </div>
      </ProfileCard>
      <ProfileCard>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 className='profile-card-head'>Security</h3>
        </div>
        
        <div>
            {!openChangePassword ? <Button onClick={handleOpenChangePassword}>Change password</Button> : <ChangePassword id={user._id} updatePassword={updatePassword} handleClose={handleCloseChangePassword} />}
        </div>
      </ProfileCard>
      <EditProfile open={open} handleClose={handleClose} user={user} updateUser={updateUser} />
    </div>
  )
}

export default ProfileInfo