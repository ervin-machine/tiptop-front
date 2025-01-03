import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    token: localStorage.getItem('token') || null,
    auth: JSON.parse(localStorage.getItem('user')) || null,
    avatar: null,
    error: null,
}

const adminReducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case types.LOGIN_USER_REQUEST:
            case types.REGISTER_USER_REQUEST:
                draft.isLoading = true;
                break;
            case types.LOGIN_USER_SUCCESS:
            case types.REGISTER_USER_SUCCESS:
                draft.isLoading = false;
                draft.auth = action.payload.user // Directly assigning the user object
                draft.token = action.payload.token;
                draft.error = null;
                break;
            case types.LOGIN_USER_FAILURE:
            case types.REGISTER_USER_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.UPLOAD_AVATAR_REQUEST:
                draft.isLoading = true;
                break;
            case types.UPLOAD_AVATAR_SUCCESS:
                draft.isLoading = false;
                draft.avatar = action.payload
                draft.error = null;
                break;
            case types.UPLOAD_AVATAR_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.LOGOUT_USER_SUCCESS:
                draft.auth = null;
                draft.token = null;
                draft.error = null;
                break;
            case types.LOGOUT_USER_FAILURE:
                draft.error = action.payload.err
                break;
            default:
                break;
        }
    });

export default adminReducer