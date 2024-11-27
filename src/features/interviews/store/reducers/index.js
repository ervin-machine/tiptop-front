import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    questions: [],
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
                console.log("User POSTed:", action.payload);
                break;
            case types.CREATE_INTERVIEW_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                console.error("Error POSTing user:", action.payload);
                break;
            default:
                break;
        }
    });

export default interviewReducer