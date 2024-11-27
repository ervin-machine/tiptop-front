import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    questions: [],
    error: null,
}

const candidateReducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case types.FETCH_INTERVIEW_ACCESS_LINK_REQUEST:
                draft.isLoading = true;
                break;
            case types.FETCH_INTERVIEW_ACCESS_LINK_SUCCESS:
                draft.isLoading = false;
                draft.questions = action.payload // Directly assigning the user object
                draft.error = null;
                console.log("User fetched:", action.payload);
                break;
            case types.FETCH_INTERVIEW_ACCESS_LINK_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                console.error("Error fetching user:", action.payload);
                break;
            default:
                break;
        }
    });

export default candidateReducer