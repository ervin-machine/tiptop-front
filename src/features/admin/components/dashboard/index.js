import React, { useState } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import InterviewForm from '../../../interviews/components/interviewForm';

function Dashboard(props) {
  const { createInterview, shortUrl } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Stack sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%"
        }} className='stack-buttons' spacing={2} direction="row">
            <Button sx={{ width: "200px", height: "50px" }} onClick={handleOpen} variant="contained">Create interview</Button>
            <Button sx={{ width: "200px", height: "50px" }} variant="outlined">Interview list</Button>
        </Stack>
        <InterviewForm open={open} handleClose={handleClose} createInterview={createInterview} shortUrl={shortUrl} />
    </div>
  )
}

export default Dashboard