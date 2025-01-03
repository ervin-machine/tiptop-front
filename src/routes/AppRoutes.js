import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AdminRegister from '../features/admin/components/adminRegister';
import AdminLogin from '../features/admin/components/adminLogin';
import Admin from '../pages/admin';
import Profile from '../pages/profile';
import InterviewAccess from '../features/candidates/components/interviewAccess';
import InterviewList from '../features/interviews/components/interviewList';

import { selectToken, selectAuth } from '../features/admin/store/selectors';

import { fetchInterviews, deleteInterview, fetchInterview, updateInterview } from '../features/interviews/store/actions';
import { selectInterviews, selectInterview } from '../features/interviews/store/selectors';

// PrivateRoute Component
const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

// PublicRoute Component
const PublicRoute = ({ token, children }) => {
  return token ? <Navigate to="/dashboard" /> : children;
};

const AppRoutes = ({ token, fetchInterviews, interviews, user, deleteInterview, interview, fetchInterview, updateInterview }) => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={
            <PublicRoute token={token}>
              <AdminRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute token={token}>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/:shortId"
          element={
            <PublicRoute token={token}>
              <InterviewAccess />
            </PublicRoute>
          }
        />
        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute token={token}>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/interviews"
          element={
            <PrivateRoute token={token}>
              <InterviewList 
                fetchInterviews={fetchInterviews} 
                interviews={interviews} 
                user={user} 
                deleteInterview={deleteInterview} 
                interview={interview}
                fetchInterview={fetchInterview}
                updateInterview={updateInterview}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute token={token}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  interviews: selectInterviews(),
  user: selectAuth(),
  interview: selectInterview()
});

const mapDispatchToProps = dispatch => {
  return {
    fetchInterviews: (userID) => {
        dispatch(fetchInterviews(userID))
      },
    deleteInterview: (shortId) => {
        dispatch(deleteInterview(shortId))
    },
    fetchInterview: (shortId) => {
      dispatch(fetchInterview(shortId))
    },
    updateInterview: (interview) => {
      dispatch(updateInterview(interview))
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(AppRoutes);
