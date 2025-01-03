import React, { useEffect } from 'react'
import './profile.scss'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectAuth } from '../../features/admin/store/selectors'

import { selectUser } from '../../features/profile/store/selectors/index.js'
import { fetchUser, updateUser } from '../../features/profile/store/actions/index.js'
import { updatePassword } from '../../features/admin/store/actions/index.js'

import ProfileInfo from '../../features/profile/components/profileInfo'
import HeaderLayout from '../../layouts/HeaderLayout.js'

function Profile(props) {
  const { auth, user, fetchUser, updateUser, updatePassword } = props;

  useEffect(() => {
    fetchUser(auth.id)
  }, [auth.id, fetchUser])

  return (
    <div>
      <HeaderLayout />
      <ProfileInfo user={user} updateUser={updateUser} updatePassword={updatePassword} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuth(),
  user: selectUser()
})

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userID) => {
      dispatch(fetchUser(userID))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    },
    updatePassword: (id, currentPassword, newPassword) => {
      dispatch(updatePassword(id, currentPassword, newPassword))
    }
  }
}


const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(Profile)