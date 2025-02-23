import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InterviewForm from '../interviewForm';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

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
    height: 300,
    overflowY: 'auto' 
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    margin: 10
  }));

function InterviewCreate(props) {
  const { handleClose, open, auth, createInterview, shortUrl, createInterviewTemplate, fetchInterviewTemplates, interviewTemplates, checkInterview, isInterviewExist } = props

  const [isFormOpen, setFormOpen] = useState(false);
  const [interviewTemplate, setInterviewTemplate] = useState(null);

  const handleOpenForm = () => setFormOpen(true);
  const handleCloseForm = () => setFormOpen(false);

  const handleInterviewTemplate = (interviewTemplate) => {
    setInterviewTemplate(interviewTemplate)
    handleOpenForm();
  }

  useEffect(() => {
    fetchInterviewTemplates(auth.id)
  }, [fetchInterviewTemplates, auth.id])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Button onClick={handleOpenForm}>Create new interview</Button>
            <Typography>Or</Typography>
            <Typography>Choose from template: </Typography>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                sx={{ width: 500, flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}
            >
              {interviewTemplates?.map(interviewTemplate => 
                <div key={interviewTemplate._id}>
                  <Item sx={{ cursor: "pointer" }} onClick={() => handleInterviewTemplate(interviewTemplate)}>{interviewTemplate.candidatePosition}</Item>
                </div>
              )}
               
             </Stack>
            <InterviewForm
                open={isFormOpen}
                handleClose={handleCloseForm}
                createInterview={createInterview}
                shortUrl={shortUrl}
                auth={auth}
                createInterviewTemplate={createInterviewTemplate}
                interviewTemplate={interviewTemplate}
                handleCloseInterviewCreate={handleClose}
                checkInterview={checkInterview}
                isInterviewExist={isInterviewExist}
            />
        </Box>
      </Modal>
    </div>
  )
}

export default InterviewCreate