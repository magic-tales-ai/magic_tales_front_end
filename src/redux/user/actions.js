import {
    UPDATE_TOKEN,
    LOAD_MONTH_STORIES_COUNT_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    VALIDATE_NEW_USER_EMAIL,
    VALIDATE_NEW_USER_EMAIL_SUCCESS,
    CHANGE_PASSWORD_LOGGED_USER,
    CHANGE_PASSWORD_LOGGED_USER_SUCCESS,
    USER_API_FAILED
} from './constants';

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

export const userApiError = (error) => ({
    type: USER_API_FAILED,
    payload: error
});