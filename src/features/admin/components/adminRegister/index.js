import React from 'react';
import './AdminRegister.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { registerUser } from '../../store/actions';
import { selectAvatar } from '../../store/selectors';

import { registerSchema } from '../../schemas/registerSchema';

const AdminRegister = ({ registerUser }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      registerUser(values.firstName, values.lastName, values.email, values.password, values.phone, values.companyName, values.companyPosition);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="admin-register-container">
      <div className="admin-register-content">
        <div className="admin-register-background"></div>
      </div>
      <div className="admin-register-form">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h3">
          Create an account
        </Typography>
        <Typography variant="h6">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>

        <Formik
          initialValues={{
            avatar: null,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            companyName: '',
            companyPosition: ''
          }}cccc
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div style={{ display: "flex" }}>
                <div>
                  <Field
                    id="firstName"
                    className="register-input"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                  />
                  {errors.firstName && touched.firstName ? (
                  <div>
                    {errors.firstName}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    id="lastName"
                    className="register-input"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                  />
                  {errors.lastName && touched.lastName ? (
                     <div>{errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              
              <div style={{ display: "flex" }}>
                <div>
                    <Field
                      id="email"
                      className="register-input"
                      name="email"
                      placeholder="jane@acme.com"
                      type="email"
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                </div>
                <div>
                  <Field
                    id="password"
                    className="register-input"
                    name="password"
                    placeholder="Your password"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              
              <div style={{ display: "flex" }}>
                <div>
                  <Field
                    id="phone"
                    className="register-input"
                    name="phone"
                    placeholder="Your phone"
                    type="string"
                  />
                  {errors.phone && touched.phone ? (
                    <div>{errors.phone}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    id="companyName"
                    className="register-input"
                    name="companyName"
                    placeholder="Company name"
                    type="string"
                  />
                  {errors.companyName && touched.companyName ? (
                    <div>{errors.companyName}</div>
                  ) : null}
                </div>
                
              </div>

              <div>
                <Field
                  id="companyPosition"
                  className="register-input"
                  name="companyPosition"
                  placeholder="Your position"
                  type="string"
                />
                {errors.companyPosition && touched.companyPosition ? (
                  <div>{errors.companyPosition}</div>
                ) : null}
              </div>
              <Button className="register-btn" type="submit" variant="contained">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  avatar: selectAvatar(),
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (firstName, lastName, email, password, phone, companyName, companyPosition) =>
    dispatch(registerUser(firstName, lastName, email, password, phone, companyName, companyPosition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRegister);
