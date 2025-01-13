import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import InterviewCreate from '../../../interviews/components/interviewCreate';

const Dashboard = ({ auth, createInterview, shortUrl, createInterviewTemplate, fetchInterviewTemplates, interviewTemplates, checkInterview, isInterviewExist }) => {
  const [isInterviewCreateOpen, setInterviewCreateOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenInterviewCreate = () => setInterviewCreateOpen(true);
  const handleCloseInterviewCreate = () => setInterviewCreateOpen(false);

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
          onClick={handleOpenInterviewCreate}
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

      <InterviewCreate 
        open={isInterviewCreateOpen}
        handleClose={handleCloseInterviewCreate} 
        createInterview={createInterview}
        shortUrl={shortUrl}
        auth={auth}
        createInterviewTemplate={createInterviewTemplate}
        fetchInterviewTemplates={fetchInterviewTemplates}
        interviewTemplates={interviewTemplates}
        checkInterview={checkInterview}
        isInterviewExist={isInterviewExist}
      />
      
    </div>
  );
};

export default Dashboard;
