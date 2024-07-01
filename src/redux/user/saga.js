import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';

import {
    LOAD_MONTH_STORIES_COUNT,
    UPDATE_USER,
    CHANGE_PASSWORD_LOGGED_USER,
    VALIDATE_NEW_USER_EMAIL,
} from './constants';

import { WEBSOCKET_MESSAGE, websocket_commands_messages } from '../websocket/constants';

import {
    userApiError as apiError,
    loadMonthStoriesCountSuccess,
    updateUserSuccess,
    validateNewUserEmailSuccess,
    updateUserPasswordSuccess
} from './actions';


/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;
const get = new APIClient().get;

/**
 * Month stories count
 */
function* loadMonthStoriesCount({ payload }) {
    try {
        if(!payload || payload.message.command === websocket_commands_messages.DONE) {
            if(localStorage.getItem("authUser")) {
                const response = yield call(get, 'user/month-stories-count');
                yield put(loadMonthStoriesCountSuccess(response));
            }
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * Update user data
 */
function* updateUser({ payload: data }) {
    try {
        let parsedDataUser = data;
        if(data.lastName) {
            parsedDataUser.last_name = data.lastName;
            delete parsedDataUser.lastName;
        }

        const response = yield call(create, 'user/update', parsedDataUser);
        const currentAuthUserLS = JSON.parse(localStorage.getItem("authUser"))
        localStorage.setItem("authUser", JSON.stringify({...response, token: currentAuthUserLS.token}));
        yield put(updateUserSuccess(response));
    } catch (error) {console.log(error)
        yield put(apiError(error));
    }
}

/**
 * Validate new user email data
 */
function* validateNewUserEmail({ payload: { validationCode } }) {
    try {
        const response = yield call(create, 'user/change-email-validate', { validation_code: validationCode });
        yield put(validateNewUserEmailSuccess(response));
    } catch (error) {console.log(error)
        yield put(apiError(error));
    }
}

/**
 * Update new password data
 */
function* updateUserPassword({ payload: { oldPassword, newPassword, repeatedNewPassword } }) {
    try {
        const response = yield call(create, 'user/change-password', { 
            old_password: oldPassword,
            new_password: newPassword,
            repeated_new_password: repeatedNewPassword
        });
        yield put(updateUserPasswordSuccess(response));
    } catch (error) {console.log(error)
        yield put(apiError(error));
    }
}

export function* watchLoadMonthStoriesCount() {
    yield takeEvery([WEBSOCKET_MESSAGE, LOAD_MONTH_STORIES_COUNT], loadMonthStoriesCount);
}

export function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER, updateUser)
}

export function* watchValidateNewUserEmail() {
    yield takeEvery(VALIDATE_NEW_USER_EMAIL, validateNewUserEmail)
}

export function* watchUpdateUserPassword() {
    yield takeEvery(CHANGE_PASSWORD_LOGGED_USER, updateUserPassword)
}

function* authSaga() {
    yield all([
        fork(watchLoadMonthStoriesCount),
        fork(watchUpdateUser),
        fork(watchValidateNewUserEmail),
        fork(watchUpdateUserPassword)
    ]);
}

export default authSaga;