import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';


import {
    LOAD_PLANS_LIST,
} from './constants';

import {
    loadPlansListSuccess,
    plansListApiError as apiError,
} from './actions';

const get = new APIClient().get;

function* loadPlansList() {
    try {
        const response = yield call(get, '/plan');
        yield put(loadPlansListSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchLoadPlansList() {
    yield takeEvery(LOAD_PLANS_LIST, loadPlansList);
}

function* plansListSaga() {
    yield all([
        fork(watchLoadPlansList),
    ]);
}

export default plansListSaga;