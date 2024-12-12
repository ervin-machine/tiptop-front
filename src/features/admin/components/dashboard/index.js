import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import InterviewForm from '../../../interviews/components/interviewForm';

const Dashboard = ({ createInterview, shortUrl }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenForm = () => setFormOpen(true);
  const handleCloseForm = () => setFormOpen(false);

  const handleInterviewList = () => {
    navigate('/interviews');
  }

  return (
    <div>
      <Stack
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
        className="stack-buttons"
        spacing={2}
        direction="row"
      >
        <Button
          sx={{ width: '200px', height: '50px' }}
          onClick={handleOpenForm}
          variant="contained"
        >
          Create Interview
        </Button>
        <Button
          sx={{ width: '200px', height: '50px' }}
          variant="outlined"
          onClick={handleInterviewList}
        >
          Interview List
        </Button>
      </Stack>

      <InterviewForm
        open={isFormOpen}
        handleClose={handleCloseForm}
        createInterview={createInterview}
        shortUrl={shortUrl}
      />
    </div>
  );
};

export default Dashboard;
