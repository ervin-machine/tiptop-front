import React from 'react'

import { Formik, Field, Form } from 'formik';

import { Button } from '@mui/material';

function ChangePassword(props) {
    const { handleClose, id, updatePassword } = props
    const handleSubmit = async (values) => {
      try {
            handleClose()
            updatePassword({ _id: id, currentPassword: values.currentPassword, newPassword: values.newPassword });
            window.location.reload();
      } catch (error) {
        console.error('Update failed:', error);
      }
    };

    return (
        <div>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: ''
              }}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                    <div>
                        <Field
                            id="currentPassword"
                            className="change-password-input"
                            name="currentPassword"
                            placeholder="Current password"
                            type="text"
                        />
                        <Field
                          id="newPassword"
                          className="change-password-input"
                          name="newPassword"
                          placeholder="New password"
                          type="text"
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
        </div>
    )
}

export default ChangePassword