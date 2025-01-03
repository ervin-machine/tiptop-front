import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectQuestions, selectTranscribe, selectSummarization, selectAudioId } from '../../store/selectors'
import { interviewAccess, transcribeAudio, updateInterview, fetchAnswer } from '../../store/actions'

import { Button } from '@mui/material'
import Typography from '@mui/material/Typography';

import AudioRecorder from '../audioRecord'

function InterviewAccess(props) {
  const { interviewAccess, questions, transcribeAudio, updateInterview } = props;
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const { shortId } = useParams();

  const handleStartInterview = () => {
    setIsInterviewStarted(true);
    const timestamp = new Date().getTime();
    localStorage.setItem("isInterviewStarted", JSON.stringify({ isInterviewStarted: true, timestamp }));
  }

  useEffect(() => {
    interviewAccess(shortId);

  }, [shortId, interviewAccess])
  
    useEffect(() => {
      // Check for Expired Active Step on Mount
      const checkActiveStepExpiration = () => {
        const savedIsInterviewStarted = localStorage.getItem("isInterviewStarted");
  
        if (savedIsInterviewStarted) {
          const { isInterviewStarted, timestamp } = JSON.parse(savedIsInterviewStarted);
          const currentTime = new Date().getTime();
          // Remove if more than 1 minute (60,000 milliseconds) has passed
          if (currentTime - timestamp > 300000) {
            localStorage.removeItem("isInterviewStarted");
          } else {
            console.log(isInterviewStarted)
            setIsInterviewStarted(isInterviewStarted)
          }
        }
      };
    
      checkActiveStepExpiration();
    }, []);

  return (
    <div style={{ textAlign: "center"}}>
        {!isInterviewStarted ? <div>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
             Welcome to the interview
          </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Click start to access interview
        </Typography>
        <Button onClick={handleStartInterview} variant='contained'>START</Button>
        <div style={{ marginTop: "20px"}}>
        <Typography>
          *NOTES
        </Typography>
        <ul>
          <ol>You can record answer up to 2 minutes</ol>
          <ol>You can only re-record 2 times</ol>
        </ul>
        </div>
        </div> :
        <AudioRecorder 
          questions={questions} 
          transcribeAudio={transcribeAudio} 
          updateInterview={updateInterview}
          shortId={shortId}
        />}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
    questions: selectQuestions(),
    transcribe: selectTranscribe(),
    summarization: selectSummarization(),
    audioID: selectAudioId()
  })
  
  const mapDispatchToProps = dispatch => {
    return {
        interviewAccess: (shortId) => {
            dispatch(interviewAccess(shortId))
        },
        transcribeAudio: (formData, activeStep, questions) => {
          dispatch(transcribeAudio(formData, activeStep, questions))
        },
        updateInterview: (shortId, questions) => {
          dispatch(updateInterview(shortId, questions))
        },
        fetchAnswer: (questions) => {
          dispatch(fetchAnswer(questions))
        }
    }
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  export default (withConnect)(InterviewAccess)