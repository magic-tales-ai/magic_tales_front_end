import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { getFirebaseBackend } from "../../helpers/firebase";


import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
} from './constants';

import { WEBSOCKET_MESSAGE } from '../websocket/constants';

import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    apiError,
    logoutUserSuccess,
    loadMonthStoriesCountSuccess
} from './actions';


//Initilize firebase
const fireBaseBackend = getFirebaseBackend();


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
        const response = yield call(create, 'session/register', user);
        yield put(registerUserSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
    try {
        const response = yield call(create, '/forget-pwd', { email });
        yield put(forgetPasswordSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

/**
 * Month stories count
 */
function* loadMonthStoriesCount({ payload }) {
    try {
        if(payload.message.command == 'new-tale') {
            if(localStorage.getItem("authUser")) {
                const response = yield call(get, 'user/month-stories-count');
                yield put(loadMonthStoriesCountSuccess(response));
            }
        }
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

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchLoadMonthStoriesCount() {
    yield takeEvery(WEBSOCKET_MESSAGE, loadMonthStoriesCount);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchLoadMonthStoriesCount)
    ]);
}

export default authSaga;