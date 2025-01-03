import React, { useState, useEffect } from 'react'

import { Formik, Field, Form } from 'formik';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import RemoveIcon from '@mui/icons-material/Remove';
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
  const { auth, open, handleClose, createInterview, shortUrl, createInterviewTemplate, interviewTemplate, handleCloseInterviewCreate } = props;
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

  const handleQuestions = async () => {
    setQuestions(questions => { return [...questions, { 
      id: (questions.length - 1) + 1,
      question: question,
      answer: "",
      transcribe: "",
      summarization: ""
    } ]})
    setQuestion('')
  }

  const handleDeleteQuestion = (id) => {
    setQuestions(questions => { 
      return questions.filter(question => question.id !== id)
    })
  }

  const handleCreateInterview = async (values, id, longUrl, questions) => {
    createInterview(id, values.candidatePosition, values.candidateFirstName, values.candidateLastName, values.candidateEmail, longUrl, questions)
    createInterviewTemplate(id, values.candidatePosition, questions)
    setIsCreated(true);
  }

  const handleCloseCreateInterview = () => {
    handleClose();
    setIsCreated(false);
    handleCloseInterviewCreate();
  }

  useEffect(() => {
    if(interviewTemplate) {
      setQuestions(interviewTemplate?.questions)
    }
  }, [interviewTemplate])


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
        <Formik
          initialValues={{
            candidatePosition: interviewTemplate?.candidatePosition || '',
            candidateFirstName: '',
            candidateLastName: '',
            candidateEmail: '',
            question: '',
          }}
          onSubmit={async (values) => {
            
            await handleCreateInterview(values, auth.id, makeID(), questions)
          }}
        >
          {() => (
            <Form>
              <div>
                <Field
                  id="candidatePosition"
                  className="interview-input"
                  name="candidatePosition"
                  placeholder="Position"
                  type="text"
                />
                <Field
                  id="candidateFirstName"
                  className="interview-input"
                  name="candidateFirstName"
                  placeholder="Candidate First Name"
                  type="text"
                />
              </div>
              <div>
                <Field
                  id="candidateLastName"
                  className="interview-input"
                  name="candidateLastName"
                  placeholder="Candidate Last Name"
                  type="text"
                />
                <Field
                  id="candidateEmail"
                  className="interview-input"
                  name="candidateEmail"
                  placeholder="jane@acme.com"
                  type="email"
                />
              </div>
                <List sx={{ height: 400, overflowY: 'auto' }}>
                  <Stack spacing={0} direction="row">
                    <Field
                      id="question"
                      className="interview-input"
                      name="question"
                      placeholder="Question"
                      type="string"
                      value={question}
                      onChange={handleQuestion }
                    />
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
                        <Button onClick={() => handleDeleteQuestion(question.id)}><RemoveIcon /></Button>
                      </ListItem>
                  )}
                </List>
                
              
              <Button sx={{ width: 200 }} type="submit" variant='contained'>Create interview</Button>
              <Button sx={{ width: 200, marginLeft: 2 }} onClick={handleClose}>Cancel</Button>
            </Form>
          )}
        </Formik>
        </Box>}
      </Modal>
        
    </div>
  )
}

export default InterviewForm