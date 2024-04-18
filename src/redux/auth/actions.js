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
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    UPDATE_TOKEN,
    LOAD_MONTH_STORIES_COUNT_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    VALIDATE_NEW_USER_EMAIL,
    VALIDATE_NEW_USER_EMAIL_SUCCESS,
    CHANGE_PASSWORD_LOGGED_USER,
    CHANGE_PASSWORD_LOGGED_USER_SUCCESS,
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

export const forgetPassword = (email) => ({
    type: FORGET_PASSWORD,
    payload: { email }
});

export const forgetPasswordSuccess = () => ({
    type: FORGET_PASSWORD_SUCCESS
});

export const changePassword = ({ email, newPassword, repeatedNewPassword, validationCode }) => ({
    type: CHANGE_PASSWORD,
    payload: {
        email,
        newPassword,
        repeatedNewPassword,
        validationCode
    }
})

export const changePasswordSuccess = () => ({
    type: CHANGE_PASSWORD_SUCCESS
})

/* logged */

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS,
    payload: {},
});

export const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    payload: token
})

export const loadMonthStoriesCountSuccess = (status) => ({
    type: LOAD_MONTH_STORIES_COUNT_SUCCESS,
    payload: status
});

export const updateUser = (data) => ({
    type: UPDATE_USER,
    payload: data
})

export const updateUserSuccess = (data) => ({
    type: UPDATE_USER_SUCCESS,
    payload: data
})

export const velidateNewUserEmail = (data) => ({
    type: VALIDATE_NEW_USER_EMAIL,
    payload: data
})

export const validateNewUserEmailSuccess = (data) => ({
    type: VALIDATE_NEW_USER_EMAIL_SUCCESS,
    payload: data
})

export const updateUserPassword = (data) => ({
    type: CHANGE_PASSWORD_LOGGED_USER,
    payload: data
})

export const updateUserPasswordSuccess = (data) => ({
    type: CHANGE_PASSWORD_LOGGED_USER_SUCCESS,
    payload: data
})

export const apiError = (error) => ({
    type: API_FAILED,
    payload: error
});