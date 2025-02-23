import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

function InterviewTemplateCreate(props) {
  const { handleClose, open, handleTemplateCreate } = props

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography>Do you want to create the template?</Typography>
            <Button onClick={handleTemplateCreate} variant='contained'>Yes</Button>
            <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default InterviewTemplateCreate