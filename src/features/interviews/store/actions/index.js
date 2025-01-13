import { types } from "../constants"
import { interviewCreate, getInterviews, getAnswer, interviewDelete, interviewTemplateCreate, getInterviewTemplates, getInterview, interviewUpdate, interviewCheck } from '../../hooks'

const createInterviewRequest = () => {
  return {
      type: types.CREATE_INTERVIEW_REQUEST
  }
}

const createInterviewSuccess = (shortUrl) => {
  return {
      type: types.CREATE_INTERVIEW_SUCCESS,
      payload: shortUrl
  }
}

const createInterviewFailure = (err) => {
  return {
      type: types.CREATE_INTERVIEW_FAILURE,
      payload: err
  }
}

const createInterviewTemplateRequest = () => {
    return {
        type: types.CREATE_INTERVIEW_TEMPLATE_REQUEST
    }
  }
  
  const createInterviewTemplateSuccess = () => {
    return {
        type: types.CREATE_INTERVIEW_TEMPLATE_SUCCESS
    }
  }
  
  const createInterviewTemplateFailure = (err) => {
    return {
        type: types.CREATE_INTERVIEW_TEMPLATE_FAILURE,
        payload: err
    }
  }

const deleteInterviewRequest = () => {
    return {
        type: types.DELETE_INTERVIEW_REQUEST
    }
  }
  
  const deleteInterviewSuccess = () => {
    return {
        type: types.DELETE_INTERVIEW_SUCCESS,
    }
  }
  
  const deleteInterviewFailure = (err) => {
    return {
        type: types.DELETE_INTERVIEW_FAILURE,
        payload: err
    }
  }

const getInterviewsRequest = () => {
  return {
      type: types.GET_INTERVIEWS_REQUEST
  }
}

const getInterviewsSuccess = (data) => {
  return {
      type: types.GET_INTERVIEWS_SUCCESS,
      payload: data
  }
}

const getInterviewsFailure = (err) => {
  return {
      type: types.GET_INTERVIEWS_FAILURE,
      payload: err
  }
}

const getInterviewRequest = () => {
    return {
        type: types.GET_INTERVIEW_REQUEST
    }
  }
  
  const getInterviewSuccess = (data) => {
    return {
        type: types.GET_INTERVIEW_SUCCESS,
        payload: data
    }
  }
  
  const getInterviewFailure = (err) => {
    return {
        type: types.GET_INTERVIEW_FAILURE,
        payload: err
    }
  }

  const updateInterviewRequest = () => {
    return {
        type: types.UPDATE_INTERVIEW_REQUEST
    }
  }
  
  const updateInterviewSuccess = () => {
    return {
        type: types.UPDATE_INTERVIEW_SUCCESS,
    }
  }
  
  const updateInterviewFailure = (err) => {
    return {
        type: types.UPDATE_INTERVIEW_FAILURE,
        payload: err
    }
  }

const getInterviewTemplatesRequest = () => {
    return {
        type: types.GET_INTERVIEW_TEMPLATES_REQUEST
    }
  }
  
  const getInterviewTemplatesSuccess = (data) => {
    return {
        type: types.GET_INTERVIEW_TEMPLATES_SUCCESS,
        payload: data
    }
  }
  
  const getInterviewTemplatesFailure = (err) => {
    return {
        type: types.GET_INTERVIEW_TEMPLATES_FAILURE,
        payload: err
    }
  }

  const interviewCheckRequest = () => {
    return {
        type: types.CHECK_INTERVIEW_REQUEST
    }
  }
  
  const interviewCheckSuccess = (data) => {
    return {
        type: types.CHECK_INTERVIEW_SUCCESS,
        payload: data
    }
  }
  
  const interviewCheckFailure = (err) => {
    return {
        type: types.CHECK_INTERVIEW_FAILURE,
        payload: err
    }
  }

export const createInterview = (userId, candidatePosition, candidateFirstName, candidateLastName, candidateEmail, longUrl, questions) => {
    return async (dispatch) => {
        dispatch(createInterviewRequest())
        try {
            const response = await interviewCreate(userId, candidatePosition, candidateFirstName, candidateLastName, candidateEmail, longUrl, questions);
            const shortUrl = response.data.shortUrl;
            dispatch(createInterviewSuccess(shortUrl))
        } catch(err) {
            dispatch(createInterviewFailure(err))
        }
    }
  }

  export const createInterviewTemplate = (userId, candidatePosition, questions) => {
    return async (dispatch) => {
        dispatch(createInterviewTemplateRequest())
        try {
            await interviewTemplateCreate(userId, candidatePosition, questions);
            dispatch(createInterviewTemplateSuccess())
        } catch(err) {
            dispatch(createInterviewTemplateFailure(err))
        }
    }
  }

export const deleteInterview = (shortId) => {
  return async (dispatch) => {
      dispatch(deleteInterviewRequest())
      try {
          await interviewDelete(shortId);

          dispatch(deleteInterviewSuccess())
      } catch(err) {
          dispatch(deleteInterviewFailure(err))
      }
  }
}

export const updateInterview = (id, interview) => {
    return async (dispatch) => {
        dispatch(updateInterviewRequest())
        try {
            await interviewUpdate(id, interview);
            
            dispatch(updateInterviewSuccess())
        } catch(err) {
            dispatch(updateInterviewFailure(err))
        }
    }
  }
  

  export const fetchInterviews = (userID) => {
    return async (dispatch) => {
        dispatch(getInterviewsRequest());
        try {
            const response = await getInterviews(userID);

            const updatedInterviews = await Promise.all(
              response.data.interviews.map(async (interview) => {
                  const updatedQuestions = await Promise.all(
                      interview.questions.map(async (question) => {
                        if(question.answer !== undefined) {
                            try {
                                if (question?.answer.length > 0) {
                                    const answerResponse = await getAnswer(question?.answer);
                                    const blob = answerResponse.data; // Ensure `getAnswer` returns a Blob or appropriate data
                                    const url = URL.createObjectURL(blob);
                                    return {
                                        ...question,
                                        audioUrl: url, // Add audio URL to the question
                                    };
                                } else {
                                    return {
                                        ...question,
                                        audioUrl: "", // Fallback URL if answer is empty
                                    };
                                }
                            } catch (err) {
                                console.error(
                                    "Error fetching answer for question:",
                                    question?.answer,
                                    err
                                );
                                throw err; // Allow errors to bubble up to be handled
                            }
                        }}
                          
                    ));
          
                  // Return the interview object with updated questions
                  return {
                      ...interview,
                      questions: updatedQuestions,
                  };
              })
          );

            dispatch(
                getInterviewsSuccess(updatedInterviews)
            );
        } catch (err) {
            console.error("Error fetching interviews or processing answers:", err);
            dispatch(getInterviewsFailure(err));
        }
    };
};

export const fetchInterviewTemplates = (userID) => {
    return async (dispatch) => {
        dispatch(getInterviewTemplatesRequest());
        try {
            const response = await getInterviewTemplates(userID);
            
            const interviewTemplates = response.data.interviewTemplates || [];

            dispatch(
                getInterviewTemplatesSuccess(interviewTemplates)
            );
        } catch (err) {
            console.error("Error fetching questions or processing answers:", err);
            dispatch(getInterviewTemplatesFailure(err));
        }
    };
};

export const fetchInterview = (shortId) => {
    return async (dispatch) => {
        dispatch(getInterviewRequest());
        try {
            const response = await getInterview(shortId);
            const interview = response.data.interview;

            dispatch(
                getInterviewSuccess(interview)
            );
        } catch (err) {
            console.error("Error fetching questions or processing answers:", err);
            dispatch(getInterviewFailure(err));
        }
    };
};

export const checkInterview = (interview) => {
    return async (dispatch) => {
        dispatch(interviewCheckRequest());
        try {
            const response = await interviewCheck(interview);
            
            dispatch(
                interviewCheckSuccess(response.data)
            );
        } catch (err) {
            console.error("Error check interveiw:", err);
            dispatch(interviewCheckFailure(err));
        }
    };
};