import React, { useEffect, useState } from 'react'

import { Formik, Field, Form } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};

function EditInterview(props) {
  const { open, handleClose, interview, updateInterview } = props;
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);

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

  const handleSubmit = async (values) => {
    try {
        handleClose()
        await updateInterview({_id: interview[0]._id, ...values, questions });
        setTimeout(() => {
          window.location.reload()
        }, 500)
        
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions => { 
      return questions.filter(question => question.id !== id)
    })
  }

  useEffect(() => {
    if(interview || interview?.length !== 0) {
      setQuestions(interview[0]?.questions)
    }
    else {
      return null; // Render nothing if interview data is not ready
    }
  }, [interview])


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
            candidatePosition: interview[0]?.candidatePosition || '',
            candidateFirstName: interview[0]?.candidateFirstName || '',
            candidateLastName: interview[0]?.candidateLastName || '',
            candidateEmail: interview[0]?.candidateEmail || '',
          }}
          enableReinitialize
          onSubmit={handleSubmit}
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
                    {questions?.map((question, key) => 
                      <ListItem key={key}>
                        <ListItemText
                          primary={question.question}
                        />
                        <Button onClick={() => handleDeleteQuestion(question.id)}><RemoveIcon /></Button>
                      </ListItem>
                  )}
                </List>
                
              
              <Button sx={{ width: 200 }} type="submit" variant='contained'>Update interview</Button>
              <Button sx={{ width: 200, marginLeft: 2 }} onClick={handleClose}>Cancel</Button>
            </Form>
          )}
        </Formik>
        </Box>
      </Modal>
  )
}

export default EditInterview