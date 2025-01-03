import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    questions: [],
    transcribe: "",
    summarization: "",
    audioID: null,
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
                draft.questions = [...action.payload.questions] // Directly assigning the user object
                draft.error = null;
                break;
            case types.FETCH_INTERVIEW_ACCESS_LINK_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.FETCH_TRANSCRIBE_REQUEST:
                draft.isLoading = true;
                break;
            case types.FETCH_TRANSCRIBE_SUCCESS:
                draft.isLoading = false;
                draft.questions = [...action.payload.updatedQuestions]
                break;
            case types.FETCH_TRANSCRIBE_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.UPDATE_INTERVIEW_REQUEST:
                draft.isLoading = true;
                break;
            case types.UPDATE_INTERVIEW_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                break;
            case types.UPDATE_INTERVIEW_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.FETCH_ANSWER_REQUEST:
                draft.isLoading = true;
                break;
            case types.FETCH_ANSWER_SUCCESS:
                draft.isLoading = false;
                draft.questions = [...action.payload.updatedQuestions]
                draft.error = null;
                break;
            case types.FETCH_ANSWER_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            default:
                break;
        }
    });

export default candidateReducer