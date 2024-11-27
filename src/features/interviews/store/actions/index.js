import { types } from "../constants"
import { interviewCreate } from '../../hooks'

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