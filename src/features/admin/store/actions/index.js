import { setAuthToken } from '../../../../utils/api'
import { userLogin, userRegister, changePassword } from '../../hooks'
import { types } from "../constants"


const registerUserRequest = () => {
    return {
        type: types.REGISTER_USER_REQUEST
    }
  }
  
  const registerUserSuccess = (data) => {
    return {
        type: types.REGISTER_USER_SUCCESS,
        payload: data
    }
  }
  
  const registerUserFailure = (err) => {
    return {
        type: types.REGISTER_USER_FAILURE,
        payload: err
    }
  }

  const loginUserRequest = () => {
    return {
        type: types.LOGIN_USER_REQUEST
    }
  }
  
  const loginUserSuccess = (data) => {
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: data
    }
  }
  
  const loginUserFailure = (err) => {
    return {
        type: types.LOGIN_USER_FAILURE,
        payload: err
    }
  }

  const changePasswordRequest = () => {
    return {
        type: types.CHANGE_PASSWORD_REQUEST
    }
  }
  
  const changePasswordSuccess = () => {
    return {
        type: types.CHANGE_PASSWORD_SUCCESS,
    }
  }
  
  const changePasswordFailure = (err) => {
    return {
        type: types.CHANGE_PASSWORD_FAILURE,
        payload: err
    }
  }

  const logoutUserSuccess = () => {
    return {
        type: types.LOGOUT_USER_SUCCESS
    }
  }

  const logoutUserFailure = (err) => {
    return {
        type: types.LOGOUT_USER_FAILURE,
        payload: err
    }
  }

export const registerUser = (firstName, lastName, email, password, phone, companyName, companyPosition) => {
    return async (dispatch) => {
        dispatch(registerUserRequest())
        try {
            const response = await userRegister(firstName, lastName, email, password, phone, companyName, companyPosition);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token);

            dispatch(registerUserSuccess({ token, user }))
        } catch(err) {
            dispatch(registerUserFailure(err))
        }
    }
}

export const loginUser = (email, password) => {
    return async (dispatch) => {
        dispatch(loginUserRequest())
        try {
            const response = await userLogin(email, password);
            const { token, user } = response.data;
  
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token);
  
            dispatch(loginUserSuccess({ token, user }))
        } catch(err) {
            dispatch(loginUserFailure(err))
        }
    }
  }
  
  export const updatePassword = (_id, currentPassword, newPassword) => {
    return async (dispatch) => {
        dispatch(changePasswordRequest())
        try {
            await changePassword(_id, currentPassword, newPassword);
  
            dispatch(changePasswordSuccess())
        } catch(err) {
            dispatch(changePasswordFailure(err))
        }
    }
  }

  export const logoutUser = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            setAuthToken(null);

            logoutUserSuccess();
        } catch(err) {
            dispatch(logoutUserFailure(err))
        }
    }
  }