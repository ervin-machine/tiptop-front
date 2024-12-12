import React, { useState } from 'react'
import "./interviewForm.scss"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  alignItems: 'left'
};

function InterviewForm(props) {
  const { open, handleClose, createInterview, shortUrl } = props;
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const makeID = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  }

  const handleQuestions = () => {
    setQuestions(questions => { return [...questions, { 
      id: (questions.length - 1) + 1,
      question: question,
      answer: "",
      transcribe: "",
      summarization: ""
    } ]})
    setQuestion('')
  }

  const handleCreateInterview = () => {
    createInterview(makeID(), questions)
    setIsCreated(true);
  }

  const handleCloseCreateInterview = () => {
    handleClose();
    setIsCreated(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isCreated ? <Box sx={{position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: "flex",
            }}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Interview link: 
            </Typography>
            <TextField sx={{ width: 300, marginTop: 2, marginLeft: 2}} id="outlined-basic" variant="outlined" value={shortUrl} disabled />    
            <Button onClick={handleCloseCreateInterview}>Close</Button>
        </Box> : <Box sx={style}>
          <List sx={{ height: 400, overflowY: 'auto' }}>
            <Stack spacing={0} direction="row">
              <TextField id="outlined-basic" label="Question" variant="outlined" value={question} onChange={handleQuestion }/>
              <Button onClick={handleQuestions}><AddIcon /></Button>
            </Stack>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Questions:
            </Typography>
              {questions.map((question, key) => 
                <ListItem key={key}>
                  <ListItemText
                    primary={question.question}
                  />
                </ListItem>
            )}
          </List>
          <Button sx={{ width: 200 }} variant='contained' onClick={handleCreateInterview}>Create interview</Button>
        </Box>}
      </Modal>
        
    </div>
  )
}

export default InterviewForm