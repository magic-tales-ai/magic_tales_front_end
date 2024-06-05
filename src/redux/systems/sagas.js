import { all, call, fork, put, takeEvery, select } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { getSystemById } from './selectors';

import {
  FETCH_SYSTEM,
} from './constants';

import {
  fetchSystemSuccess,
  fetchSystemFailed as apiError,
} from './actions';

const apiClient = new APIClient();

function* fetchSystem({ payload }) {
  const { systemId } = payload;

  try {
    const system = yield select(getSystemById, systemId);

    if (system.isNew) {
      const response = yield call(apiClient.get, `/system/${systemId}`);
      yield put(fetchSystemSuccess(systemId, response));
    }
  }
  catch(error) {
    console.log(error)
    yield put(apiError(systemId, error));
  }
}

export function* watchFetchSystem() {
  yield takeEvery(FETCH_SYSTEM, fetchSystem);
}

function* systemsSaga() {
  yield all([
      fork(watchFetchSystem),
  ]);
}

export default systemsSaga;