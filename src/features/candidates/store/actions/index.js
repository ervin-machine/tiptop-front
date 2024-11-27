import { getInterviewAccess } from '../../hooks'
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

export const interviewAccess = (shortId) => {
    return async (dispatch) => {
        dispatch(interviewAccessRequest())
        try {
            const response = await getInterviewAccess(shortId);
            const interview = response.data;

            dispatch(interviewAccessSuccess(interview))
        } catch(err) {
            dispatch(interviewAccessFailure(err))
        }
    }
}