import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AdminRegister from '../features/admin/components/adminRegister';
import AdminLogin from '../features/admin/components/adminLogin';
import Admin from '../pages/admin';
import InterviewAccess from '../features/candidates/components/interviewAccess';
import InterviewList from '../features/interviews/components/interviewList';

import { selectToken } from '../features/admin/store/selectors';

import { fetchInterviews } from '../features/interviews/store/actions';
import { selectInterviews } from '../features/interviews/store/selectors';

// PrivateRoute Component
const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

// PublicRoute Component
const PublicRoute = ({ token, children }) => {
  return token ? <Navigate to="/dashboard" /> : children;
};

const AppRoutes = ({ token, fetchInterviews, interviews }) => {
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
              <InterviewList fetchInterviews={fetchInterviews} interviews={interviews} />
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
});

const mapDispatchToProps = dispatch => {
  return {
    fetchInterviews: () => {
          dispatch(fetchInterviews())
      },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(AppRoutes);
