import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';


import {
    DELETE_STORY,
    LOAD_STORIES_LIST,
} from './constants';

import {
    loadStoriesListSuccess,
    storiesListApiError as apiError,
    deleteStorySuccess,
} from './actions';

const get = new APIClient().get;
const deleteC = new APIClient().delete;

function* loadStoriesList() {
    try {
        const response = yield call(get, '/story');
        yield put(loadStoriesListSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* deleteStory({ payload: storyId }) {
    try {
        const response = yield call(deleteC, '/story/' + storyId);
        yield put(deleteStorySuccess({ ...response, storyId }));
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchLoadStoriesList() {
    yield takeEvery(LOAD_STORIES_LIST, loadStoriesList);
}

export function* watchDeleteStory() {
    yield takeEvery(DELETE_STORY, deleteStory);
}

function* storiesListSaga() {
    yield all([
        fork(watchLoadStoriesList),
        fork(watchDeleteStory),
    ]);
}

export default storiesListSaga;