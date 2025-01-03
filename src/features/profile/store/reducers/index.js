import { produce } from 'immer'
import { types } from '../constants'

export const initialState = {
    isLoading: false,
    user: {},
    error: null,
}

const userReducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
            case types.GET_USER_REQUEST:
                draft.isLoading = true;
                break;
            case types.GET_USER_SUCCESS:
                draft.isLoading = false;
                draft.user = action.payload.user // Directly assigning the user object
                draft.error = null;
                break;
            case types.GET_USER_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            case types.UPDATE_USER_REQUEST:
                draft.isLoading = true;
                break;
            case types.UPDATE_USER_SUCCESS:
                draft.isLoading = false;
                draft.error = null;
                break;
            case types.UPDATE_USER_FAILURE:
                draft.isLoading = false;
                draft.error = action.payload.err;
                break;
            default:
                break;
        }
    });

export default userReducer