import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
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
  const [timer, setTimer] = useState(120)
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
      setTimer((prevKey) => prevKey + 1)

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

    const timestamp = new Date().getTime();
    localStorage.setItem("recordCount", JSON.stringify({ recordCount: recordCount, timestamp }));
  };

  // Handle Navigation to Next Question
  const handleNext = () => {
    const nextStep = activeStep + 1;
    const formData = new FormData();
    formData.append("audio", audioBlob);

    setActiveStep(nextStep);
    setRecordCount(0);
    setSeconds(0);
    setTimer(0)
    transcribeAudio(formData, activeStep, questions);
    setAudioBlob(null);

    if (nextStep === questions.length) {
      updateInterview(shortId, questions); // Update interview on completion
    }

    localStorage.setItem("activeStep", JSON.stringify({ step: nextStep }));
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
      timer = setInterval(() => setSeconds((prev) => prev + 1), 970);
    }

    if (seconds >= 120) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRecording, seconds]);

  // Update Current Question on Active Step Change
  useEffect(() => {
    setCurrentQuestion(questions[activeStep]);
  }, [activeStep, questions]);

  // Debounce UpdateInterview
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedUpdateInterview = useCallback(
    debounce(updateInterview, 1000),
    [updateInterview]
  );

  useEffect(() => {
    const lastQuestion = questions[questions.length - 1];
    if (lastQuestion?.transcribe && lastQuestion.transcribe.length > 1) {
      debouncedUpdateInterview(shortId, questions);
    }
  }, [questions[questions.length - 1]?.transcribe, shortId, debouncedUpdateInterview]);

  // Format Time Display
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    // Check for Expired Active Step on Mount
    const checkActiveStepExpiration = () => {
      const savedActiveStep = localStorage.getItem("activeStep");
      const savedRecordCount = localStorage.getItem("recordCount");
      console.log(savedActiveStep, savedRecordCount)

      if (savedActiveStep || savedRecordCount) {
        const { step } = JSON.parse(savedActiveStep);
        const { recordCount, timestamp } = JSON.parse(savedRecordCount);
        const currentTime = new Date().getTime();
  
        // Remove if more than 1 minute (60,000 milliseconds) has passed
        if (currentTime - timestamp > 300000) {
          localStorage.removeItem("activeStep");
          localStorage.removeItem("recordCount");
        } else {
          setActiveStep(step);
          setRecordCount(recordCount)
        }
      }
    };
  
    checkActiveStepExpiration();
  }, []);

  return (
    <Container>
      <Box className="audio-record-content">
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
            <Typography sx={{ mt: 2, mb: 1 }}>
              All questions completed - you&apos;re finished!
            </Typography>
          </div>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>{currentQuestion?.question}</Typography>

            <div className="all-times-bar">
              <div className="timebox">
                <CountdownCircleTimer
                  {...timerProps}
                  key={timer}
                  isPlaying={isRecording}
                  colors={[["#1976d2", 0]]}
                  isLinearGradient
                  duration={120}
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
              <Button onClick={handleNext} variant="contained" disabled={!audioBlob}>
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
