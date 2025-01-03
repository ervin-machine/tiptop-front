import { getUser, updateUserById } from '../../hooks'
import { types } from "../constants"


const getUserRequest = () => {
  return {
      type: types.GET_USER_REQUEST
  }
}

const getUserSuccess = (data) => {
  return {
      type: types.GET_USER_SUCCESS,
      payload: data
  }
}

const getUserFailure = (err) => {
  return {
      type: types.GET_USER_FAILURE,
      payload: err
  }
}

const updateUserRequest = () => {
    return {
        type: types.UPDATE_USER_REQUEST
    }
  }
  
  const updateUserSuccess = (data) => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        payload: data
    }
  }
  
  const updateUserFailure = (err) => {
    return {
        type: types.UPDATE_USER_FAILURE,
        payload: err
    }
  }

export const fetchUser = (userID) => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        try {
            const response = await getUser(userID);
            const user = response.data;
            dispatch(getUserSuccess(user))
        } catch(err) {
            dispatch(getUserFailure(err))
        }
    }
}

export const updateUser = (user) => {
    return async (dispatch) => {
        dispatch(updateUserRequest())
        try {
            await updateUserById(user);
            dispatch(updateUserSuccess())
        } catch(err) {
            dispatch(updateUserFailure(err))
        }
    }
}