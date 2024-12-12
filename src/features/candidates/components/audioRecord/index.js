import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from 'react-router-dom'
import "./audioRecord.scss";
import { Typography, Button, Container, Box, Stepper, Step, StepLabel } from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const timerProps = {
  isPlaying: true,
  size: 200,
  strokeWidth: 6,
};

const AudioRecorder = ({ questions, transcribeAudio, updateInterview }) => {
  // State Management
  const [activeStep, setActiveStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordCount, setRecordCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { shortId } = useParams();

  // References
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const recordingTimeoutRef = useRef(null);

  // Start Recording
  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Audio recording is not supported in your browser");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioRecordBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(audioRecordBlob);
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setSeconds(0);

      recordingTimeoutRef.current = setTimeout(stopRecording, 120000); // Stop after 120 seconds
    } catch (err) {
      console.error(err);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    mediaRecorder.current?.stop();
    mediaRecorder.current?.stream.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
    setRecordCount((prev) => prev + 1);
    clearTimeout(recordingTimeoutRef.current);
  };

  // Handle Navigation to Next Question
  const handleNext = () => {
    const nextStep = activeStep + 1;
    const formData = new FormData();
    formData.append("audio", audioBlob);

    setActiveStep(nextStep);
    setCurrentQuestion(questions[nextStep]);
    setRecordCount(0);
    setSeconds(0);
    transcribeAudio(formData, activeStep, questions);
  };

  // Initialize the First Question
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  // Update Timer While Recording
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }

    if (seconds >= 120) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRecording, seconds]);

  useEffect(() => {
    if(questions[questions.length - 1]?.transcribe?.length > 1) {
      console.log(questions[questions.length - 1]?.transcribe)
      console.log("test")
      updateInterview(shortId, questions)
    }
  }, [questions, shortId, updateInterview])

  // Format Time Display
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, []);
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", padding: 3 }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep}>
          {questions.map((_, index) => (
            <Step key={index}>
              <StepLabel>Question {index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Main Content */}
        {activeStep === questions.length ? (
          <div>
            <Typography sx={{ mt: 2, mb: 1 }}>All questions completed - you&apos;re finished!</Typography>
          </div>
          
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>{currentQuestion?.question}</Typography>

            <div className="all-times-bar">
              <div className="timebox">
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#6a0dad", 0], ["#9000ff", 1]]}
                  isLinearGradient
                  duration={seconds}
                  initialRemainingTime={120 - seconds}
                  trailColor="#bbb"
                >
                  {() => formatTime(seconds)}
                </CountdownCircleTimer>
              </div>
            </div>

            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant="outlined"
              sx={{ mb: 2 }}
              disabled={recordCount === 3}
            >
              {isRecording ? "Stop Answering" : "Answer Question"}
            </Button>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button onClick={handleNext} variant="contained" disabled={isRecording}>
                {activeStep === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AudioRecorder;
