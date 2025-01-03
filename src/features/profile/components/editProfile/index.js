import React from 'react'

import { Formik, Field, Form } from 'formik';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
  };

function EditProfile(props) {
    const { open, handleClose, user, updateUser } = props

    const handleSubmit = async (values) => {
    try {
        handleClose()
        updateUser({_id:user._id, 
            firstName: values.firstName, 
            lastName: values.lastName, 
            email: values.email, 
            phone: values.phone, 
            companyName: values.companyName, 
            companyPosition: values.companyPosition});
        window.location.reload();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            phone: user.phone,
            companyName: user.companyName,
            companyPosition: user.companyPosition
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field
                id="firstName"
                className="edit-input"
                name="firstName"
                placeholder="First Name"
                type="text"
              />
              <Field
                id="lastName"
                className="edit-input"
                name="lastName"
                placeholder="Last Name"
                type="text"
              />
              <div>
                <Field
                  id="email"
                  className="edit-input"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                <Field
                  id="phone"
                  className="edit-input"
                  name="phone"
                  placeholder="Your phone"
                  type="string"
                />
              </div>
              <div>
                <Field
                  id="companyName"
                  className="edit-input"
                  name="companyName"
                  placeholder="Company name"
                  type="string"
                />
                <Field
                  id="companyPosition"
                  className="edit-input"
                  name="companyPosition"
                  placeholder="Your position"
                  type="string"
                />
              </div>
              <Button className="update-btn" type="submit" variant="contained">
                Save
              </Button>
              <Button onClick={handleClose} className="update-btn" type="submit" variant="contained">
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
        </Box>
      </Modal>
  )
}

export default EditProfile