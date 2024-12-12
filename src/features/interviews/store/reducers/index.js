import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    questions: [],
    interviews: [],
    shortUrl: null,
    error: null,
}

const interviewReducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case types.CREATE_INTERVIEW_REQUEST:
                draft.isLoading = true;
                break;
            case types.CREATE_INTERVIEW_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                draft.shortUrl = action.payload;
                break;
            case types.CREATE_INTERVIEW_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.GET_INTERVIEWS_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_INTERVIEWS_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                console.log(action.payload)
                draft.interviews = [...action.payload];
                break;
            case types.GET_INTERVIEWS_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            default:
                break;
        }
    });

export default interviewReducer