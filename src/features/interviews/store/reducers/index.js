import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    interviewTemplates: [],
    interviews: [],
    interview: [],
    shortUrl: null,
    error: null,
    isInterviewExist: {},
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
            case types.CREATE_INTERVIEW_TEMPLATE_REQUEST:
            case types.UPDATE_INTERVIEW_REQUEST:
            case types.DELETE_INTERVIEW_REQUEST:
                draft.isLoading = true;
                break;
            case types.CREATE_INTERVIEW_TEMPLATE_SUCCESS:
            case types.UPDATE_INTERVIEW_SUCCESS:
            case types.DELETE_INTERVIEW_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                break;
            case types.CREATE_INTERVIEW_TEMPLATE_FAILURE:
            case types.UPDATE_INTERVIEW_FAILURE:
            case types.DELETE_INTERVIEW_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.GET_INTERVIEWS_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_INTERVIEWS_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                draft.interviews = [...action.payload];
                break;
            case types.GET_INTERVIEWS_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
             case types.GET_INTERVIEW_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_INTERVIEW_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                draft.interview = [...action.payload];
                break;
            case types.GET_INTERVIEW_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.GET_INTERVIEW_TEMPLATES_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_INTERVIEW_TEMPLATES_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                draft.interviewTemplates = [...action.payload];
                break;
            case types.GET_INTERVIEW_TEMPLATES_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.CHECK_INTERVIEW_REQUEST:
                draft.isLoading = true;
                break;
            case types.CHECK_INTERVIEW_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                console.log(action.payload)
                draft.isInterviewExist = action.payload;
                break;
            case types.CHECK_INTERVIEW_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            default:
                break;
        }
    });

export default interviewReducer