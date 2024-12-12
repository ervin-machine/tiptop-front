import React from 'react';
import './adminLogin.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Field, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

import { loginUser } from '../../store/actions';
import { LoginSchema } from '../../schemas';

import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const AdminLogin = ({ loginUser }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      loginUser(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <div className="admin-login-background"></div>
      </div>

      <div className="admin-login-form">
        <Typography sx={{ mt: 4, mb: 2, color: 'black' }} variant="h3">
          Login to an account
        </Typography>
        <Typography sx={{ mt: 4, mb: 2, color: 'black' }} variant="h6">
          Don't have an account?{' '}
          <Link style={{ color: 'black' }} to="/register">
            Register
          </Link>
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div>
                <Field
                  id="email"
                  className="login-input"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
              </div>
              <div>
                <Field
                  id="password"
                  className="login-input"
                  name="password"
                  placeholder="Your password"
                  type="password"
                />
              </div>
              <Button className="login-btn" type="submit" variant="contained">
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
