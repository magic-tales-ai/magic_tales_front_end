import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    VALIDATE_USER_REGISTER,
    RESEND_VERIFICATION_CODE,
    FORGET_PASSWORD,
    CHANGE_PASSWORD,
    UPDATE_USER,
    CHANGE_PASSWORD_LOGGED_USER,
    VALIDATE_NEW_USER_EMAIL,
    CHANGE_PASSWORD_LOGGED_USER_SUCCESS
} from './constants';

import { WEBSOCKET_MESSAGE, websocket_commands_messages } from '../websocket/constants';

import {
    loginUserSuccess,
    registerUserSuccess,
    validateRegisterSuccess,
    forgetPasswordSuccess,
    changePasswordSuccess,
    apiError,
    logoutUserSuccess,
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
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { user, password, history } }) {
    try {
        const response = yield call(create, 'session/login', { user, password });
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginUserSuccess(response));
        history('/dashboard');
    } catch (error) {
        yield put(apiError(error));
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        yield put(logoutUserSuccess(true));
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { user } }) {
    try {
        const parsedUser = { ...user, last_name: user.lastName };
        delete parsedUser.lastName;
        const response = yield call(create, 'session/register', parsedUser);
        yield put(registerUserSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * Validate the user register
 */

function* validateRegister({ payload: { email, validationCode } }) {
    try {
        const response = yield call(create, 'session/register-validate', { email, validation_code: validationCode });
        yield put(validateRegisterSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* resendVerificationCode({ payload: { email } }) {
    try {
        const response = yield call(create, 'user/resend-validation-code', { email });
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
    try {
        const response = yield call(create, 'session/recover-password', { email });
        yield put(forgetPasswordSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * chenge password
 */
function* changePassword({ payload: { email, newPassword, repeatedNewPassword, validationCode } }) {
    try {
        const response = yield call(create, 'session/recover-password-validate', { 
            email,
            new_password: newPassword,
            repeated_new_password: repeatedNewPassword,
            validation_code: validationCode
        });
        yield put(changePasswordSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * Month stories count
 */
function* loadMonthStoriesCount({ payload }) {
    try {
        if(payload.message.command == websocket_commands_messages.DONE) {
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
        console.log(response)
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

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchValidateUserRegister() {
    yield takeEvery(VALIDATE_USER_REGISTER, validateRegister);
}

export function* watchResendVerificationCode() {
    yield takeEvery(RESEND_VERIFICATION_CODE, resendVerificationCode);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchChangePassword() {
    yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export function* watchLoadMonthStoriesCount() {
    yield takeEvery(WEBSOCKET_MESSAGE, loadMonthStoriesCount);
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
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchValidateUserRegister),
        fork(watchResendVerificationCode),
        fork(watchForgetPassword),
        fork(watchChangePassword),
        fork(watchLoadMonthStoriesCount),
        fork(watchUpdateUser),
        fork(watchValidateNewUserEmail),
        fork(watchUpdateUserPassword)
    ]);
}

export default authSaga;