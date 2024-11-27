import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectQuestions } from '../../store/selectors'
import { interviewAccess } from '../../store/actions'

import { Button } from '@mui/material'
import Typography from '@mui/material/Typography';

import AudioRecorder from '../audioRecord'

function InterviewAccess(props) {
  const { interviewAccess, questions } = props;
  const { shortId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState("");
    const [time, setTime] = useState(0);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const seconds = Math.floor((time % 6000) / 100);

    const startRecording = async () => {
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Audio recording is not supported in your browser");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            }

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                console.log(audioBlob)
                audioChunks.current = [];
            };

            mediaRecorder.current.start();
            setTime(mediaRecorder.current.duration)
            console.log(mediaRecorder.current)
            setIsRecording(true);

        } catch (err) {
            console.log(err);
            alert("Failed to access your microphone");
        }
    }

    const stopRecording = () => {
        if(mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    }


  useEffect(() => {
    interviewAccess(shortId);
  }, [shortId, interviewAccess])

  /*useEffect(() => {
    let intervalId;
    if (isRecording) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1);
    }
    return () => clearInterval(intervalId);
  }, [isRecording, time]);
*/

  return (
    <div style={{ textAlign: "center"}}>
        {!isRecording && !audioUrl && <div><Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
             Welcome to the interview
        </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Click start to access interview
        </Typography>
        <Button onClick={startRecording} variant='contained'>START</Button></div>}
        <AudioRecorder stopRecording={stopRecording} audioUrl={audioUrl} isRecording={isRecording} seconds={seconds} questions={questions} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
    questions: selectQuestions()
  })
  
  const mapDispatchToProps = dispatch => {
    return {
        interviewAccess: (shortId) => {
            dispatch(interviewAccess(shortId))
        },
    }
  }
  
  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  export default (withConnect)(InterviewAccess)