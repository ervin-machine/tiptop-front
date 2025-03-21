import { getInterviewAccess, getTransccribe, uploadAudio, interviewUpdate, getAnswer } from '../../hooks'
import { types } from "../constants"


const interviewAccessRequest = () => {
  return {
      type: types.FETCH_INTERVIEW_ACCESS_LINK_REQUEST
  }
}

const interviewAccessSuccess = (data) => {
  return {
      type: types.FETCH_INTERVIEW_ACCESS_LINK_SUCCESS,
      payload: data
  }
}

const interviewAccessFailure = (err) => {
  return {
      type: types.FETCH_INTERVIEW_ACCESS_LINK_FAILURE,
      payload: err
  }
}

const transcribeRequest = () => {
    return {
        type: types.FETCH_TRANSCRIBE_REQUEST
    }
  }
  
  const transcribeSuccess = (data) => {
    return {
        type: types.FETCH_TRANSCRIBE_SUCCESS,
        payload: data
    }
  }
  
  const transcribeFailure = (err) => {
    return {
        type: types.FETCH_TRANSCRIBE_FAILURE,
        payload: err
    }
  }

  const updateInterviewRequest = () => {
    return {
        type: types.UPDATE_INTERVIEW_REQUEST
    }
  }
  
  const updateInterviewSuccess = (data) => {
    return {
        type: types.UPDATE_INTERVIEW_SUCCESS,
        payload: data
    }
  }
  
  const uploadAudioFailure = (err) => {
    return {
        type: types.UPLOAD_AUDIO_FAILURE,
        payload: err
    }
  }

  const uploadAudioRequest = () => {
    return {
        type: types.UPLOAD_AUDIO_REQUEST
    }
  }
  
  const uploadAudioSuccess = (data) => {
    return {
        type: types.UPLOAD_AUDIO_SUCCESS,
        payload: data
    }
  }
  
  const updateInterviewFailure = (err) => {
    return {
        type: types.UPDATE_INTERVIEW_FAILURE,
        payload: err
    }
  }

  const fetchAnswerRequest = () => {
    return {
        type: types.FETCH_ANSWER_REQUEST
    }
  }
  
  const fetchAnswerSuccess = (data) => {
    return {
        type: types.FETCH_ANSWER_SUCCESS,
        payload: data
    }
  }
  
  const fetchAnswerFailure = (err) => {
    return {
        type: types.FETCH_ANSWER_FAILURE,
        payload: err
    }
  }

export const interviewAccess = (shortId) => {
    return async (dispatch) => {
        dispatch(interviewAccessRequest())
        try {
            const response = await getInterviewAccess(shortId);
            const interview = response.data.interview;
            dispatch(interviewAccessSuccess(interview))
        } catch(err) {
            dispatch(interviewAccessFailure(err))
        }
    }
}

export const updateInterview = (shortId, questions) => {
    return async (dispatch) => {
        dispatch(updateInterviewRequest())
        try {
            await interviewUpdate(shortId, questions);

            dispatch(updateInterviewSuccess())
        } catch(err) {
            dispatch(updateInterviewFailure(err))
        }
    }
}

export const audioUpload = (formData) => {
    return async (dispatch) => {
        dispatch(uploadAudioRequest())
        try {
            await uploadAudio(formData)
            dispatch(uploadAudioSuccess())
        } catch(err) {
            dispatch(uploadAudioFailure(err))
        }
    }
}

export const transcribeAudio = (data, activeStep, questions) => {
    return async (dispatch) => {
        dispatch(transcribeRequest())
        try {
            console.log("Before Update:", questions);

            const updatedQuestions = questions.map((question) =>
                question.id === activeStep
                    ? { 
                        ...question, 
                        answer: data.uploadID, 
                        transcribe: data.transcription, 
                        summarization: data.summary 
                    }
                    : question
            );

            console.log("Updated Questions:", updatedQuestions);
            
            dispatch(transcribeSuccess({updatedQuestions: updatedQuestions }));
            
        } catch(err) {
            dispatch(transcribeFailure(err))
        }
    }
}

export const fetchAnswer = (questions) => {
    return async (dispatch) => {
        dispatch(fetchAnswerRequest())
        try {
            const updatedQuestions = await Promise.all(
                questions.map(async (question) => {
                    const response = await getAnswer(question.answer);
                    const blob = response.data; // axios stores the blob in the `data` property
                    const url = URL.createObjectURL(blob);
                    return {
                        ...question,
                        audioUrl: url,
                    };
                })
            );

            dispatch(fetchAnswerSuccess({updatedQuestions: updatedQuestions }))
        } catch(err) {
            dispatch(fetchAnswerFailure(err))
        }
    }
}