import React from 'react'
import './AdminRegister.scss'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Formik, Field, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { registerUser } from '../../store/actions'

function AdminRegister(props) {
    const navigate = useNavigate();
    const { registerUser } = props;

  return (
    <div className='admin-register-container'>
        <div className='admin-register-content'>
          <div className='admin-register-background'></div>
        </div>
        <div className='admin-register-form'>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
                Create an account
            </Typography>
            <Typography variant="h6" component="div">
                Already have acccount ? <Link to="/login">Log in</Link>
            </Typography>
            <Formik
                initialValues={{
                    fistName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                onSubmit={async (values) => {
                  try {
                      navigate(`/login`);
                      registerUser(values.firstName, values.lastName, values.email, values.password);
                    } catch (err) {
                      console.log(err);
                    }
                }}
                >
                <Form>
                    <Field id="firstName" className="register-input" name="firstName" placeholder="First Name" type="string" />
                    <Field id="lastName" className="register-input" name="lastName" placeholder="Last Name" type="string" />
                    <div>
                        <Field id="email" className="register-input" name="email" placeholder="jane@acme.com" type="email" />
                    </div>
                    <div>
                        <Field id="password" className="register-input" name="password" placeholder="Your password" type="password" />
                    </div>
                  <Button className='register-btn' type="submit" variant="contained">Register</Button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (firstName, lastName, email, password) => {
          dispatch(registerUser(firstName, lastName, email, password))
      },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(AdminRegister)