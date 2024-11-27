import React from 'react'
import './admin.scss'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import AdminLayout from '../../layouts/AdminLayout'
import HeaderLayout from '../../layouts/HeaderLayout.js'

import Dashboard from '../../features/admin/components/dashboard'

import { selectUser } from '../../features/admin/store/selectors'
import { logoutUser } from '../../features/admin/store/actions'

import { createInterview } from '../../features/interviews/store/actions/index.js'
import { selectShortUrl } from '../../features/interviews/store/selectors/index.js'

function Admin(props) {
  const { user, logoutUser, createInterview, shortUrl } = props;

  return (
    <AdminLayout>
        <HeaderLayout logoutUser={logoutUser} />
        <Dashboard user={user} createInterview={createInterview} shortUrl={shortUrl} />
    </AdminLayout>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  shortUrl: selectShortUrl()
})

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
          dispatch(logoutUser())
      },
    createInterview: (longUrl, questions) => {
      dispatch(createInterview(longUrl, questions))
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(Admin)