import React from 'react'
import './admin.scss'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import AdminLayout from '../../layouts/AdminLayout'
import HeaderLayout from '../../layouts/HeaderLayout.js'

import Dashboard from '../../features/admin/components/dashboard'

import { selectAuth } from '../../features/admin/store/selectors'
import { logoutUser } from '../../features/admin/store/actions'

import { createInterview, createInterviewTemplate, fetchInterviewTemplates, checkInterview } from '../../features/interviews/store/actions/index.js'
import { selectShortUrl, selectInterviewTemplates, selectisInterviewExist } from '../../features/interviews/store/selectors/index.js'

function Admin(props) {
  const { auth, logoutUser, createInterview, shortUrl, createInterviewTemplate, fetchInterviewTemplates, interviewTemplates, checkInterview, isInterviewExist } = props;

  return (
    <AdminLayout>
        <HeaderLayout logoutUser={logoutUser} />
        <Dashboard 
          auth={auth} 
          createInterview={createInterview} 
          shortUrl={shortUrl} 
          createInterviewTemplate={createInterviewTemplate} 
          fetchInterviewTemplates={fetchInterviewTemplates}
          interviewTemplates={interviewTemplates}
          checkInterview={checkInterview}
          isInterviewExist={isInterviewExist}
        />
    </AdminLayout>
  )
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuth(),
  shortUrl: selectShortUrl(),
  interviewTemplates: selectInterviewTemplates(),
  isInterviewExist: selectisInterviewExist()
})

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
          dispatch(logoutUser())
      },
    createInterview: (userId, candidatePosition, candidateFirstName, candidateLastName, candidateEmail, longUrl, questions) => {
      dispatch(createInterview(userId, candidatePosition, candidateFirstName, candidateLastName, candidateEmail, longUrl, questions))
    },
    createInterviewTemplate: (userId, candidatePosition, questions) => {
      dispatch(createInterviewTemplate(userId, candidatePosition, questions))
    },
    fetchInterviewTemplates: (userId) => {
      dispatch(fetchInterviewTemplates(userId))
    },
    checkInterview: (interview) => {
      dispatch(checkInterview(interview))
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(Admin)