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
} from './constants';

import {
    loginUserSuccess,
    registerUserSuccess,
    validateRegisterSuccess,
    forgetPasswordSuccess,
    changePasswordSuccess,
    apiError,
    logoutUserSuccess,
} from './actions';


/**
 * Sets the session
 * @param {*} user 
 */

const create = new APIClient().create;

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

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchValidateUserRegister),
        fork(watchResendVerificationCode),
        fork(watchForgetPassword),
        fork(watchChangePassword),
    ]);
}

export default authSaga;