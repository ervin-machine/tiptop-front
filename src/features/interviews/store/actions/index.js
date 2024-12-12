import { types } from "../constants"
import { interviewCreate, getInterviews, getAnswer } from '../../hooks'

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

export const createInterview = (longUrl, questions) => {
    return async (dispatch) => {
        dispatch(createInterviewRequest())
        try {
            const response = await interviewCreate(longUrl, questions);
            const shortUrl = response.data.shortUrl;
            dispatch(createInterviewSuccess(shortUrl))
        } catch(err) {
            dispatch(createInterviewFailure(err))
        }
    }
  }

  export const fetchInterviews = () => {
    return async (dispatch) => {
        dispatch(getInterviewsRequest());
        try {
            const response = await getInterviews();
            console.log("Interviews fetched:", response.data.interviews);

            console.log(response.data.interviews?.questions)
            const questions = response.data.interviews.questions || [];
            console.log("Questions:", questions);

            const updatedInterviews = await Promise.all(
              response.data.interviews.map(async (interview) => {
                  const updatedQuestions = await Promise.all(
                      interview.questions.map(async (question) => {
                          try {
                              console.log("Fetching answer for question:", question.answer);
                              if (question.answer.length > 0) {
                                  const answerResponse = await getAnswer(question.answer);
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
                                  question.answer,
                                  err
                              );
                              throw err; // Allow errors to bubble up to be handled
                          }
                      })
                  );
          
                  // Return the interview object with updated questions
                  return {
                      ...interview,
                      questions: updatedQuestions,
                  };
              })
          );

            console.log("Updated questions:", updatedInterviews);

            dispatch(
                getInterviewsSuccess(updatedInterviews)
            );
        } catch (err) {
            console.error("Error fetching interviews or processing answers:", err);
            dispatch(getInterviewsFailure(err));
        }
    };
};
