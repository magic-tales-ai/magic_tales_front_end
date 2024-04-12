import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    VALIDATE_USER_REGISTER,
    VALIDATE_USER_REGISTER_SUCCESS,
    RESEND_VERIFICATION_CODE,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    UPDATE_TOKEN,
    LOAD_MONTH_STORIES_COUNT_SUCCESS,
    API_FAILED
} from './constants';

export const loginUser = (user, password, history) => ({
    type: LOGIN_USER,
    payload: { user, password, history }
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const registerUser = (user) => ({
    type: REGISTER_USER,
    payload: { user }
});

export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

export const validateRegister = ({ email, validationCode }) => ({
    type: VALIDATE_USER_REGISTER,
    payload: {
        email,
        validationCode
    }
});

export const resendVerificationCode = ({ email }) => ({
    type: RESEND_VERIFICATION_CODE,
    payload: {
        email
    }
})

export const validateRegisterSuccess = () => ({
    type: VALIDATE_USER_REGISTER_SUCCESS,
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const logoutUserSuccess = () => {
    return {
      type: LOGOUT_USER_SUCCESS,
      payload: {},
    };
  };

export const forgetPassword = (email) => ({
    type: FORGET_PASSWORD,
    payload: { email }
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus
});

export const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    payload: token
})

export const loadMonthStoriesCountSuccess = (status) => ({
    type: LOAD_MONTH_STORIES_COUNT_SUCCESS,
    payload: status
});

export const apiError = (error) => ({
    type: API_FAILED,
    payload: error
});