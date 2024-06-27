import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { downloadPDFFromFile } from '../../helpers/files';

import {
    DELETE_STORY,
    LOAD_STORIES_LIST,
    DOWNLOAD_STORY_FILE,
    DOWNLOAD_STORY_FILE_FROM_URL
} from './constants';

import {
    loadStoriesListSuccess,
    deleteStorySuccess,
    storiesListApiError as apiError,
} from './actions';

const apiClient = new APIClient();

function* loadStoriesList() {
    try {
        const response = yield call(apiClient.get, '/story');
        yield put(loadStoriesListSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* deleteStory({ payload: storyId }) {
    try {
        const response = yield call(apiClient.delete, '/story/' + storyId);
        yield put(deleteStorySuccess({ ...response, storyId }));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* downloadStoryFile({ payload: storyId }) {
    try {
        const blob = yield call(apiClient.get, '/story/' + storyId + '/download', {
            responseType: 'blob'
        });

        downloadPDFFromFile(blob, 'story');
    } catch (error) {
        console.log(error)
        yield put(apiError(error));
    }
}

function* downloadStoryFileFromURL({ payload: FileURL }) {
    try {
        const blob = yield call(apiClient.get, FileURL, {
            responseType: 'blob'
        });

        downloadPDFFromFile(blob, 'story');
    } catch (error) {
        console.log(error)
        yield put(apiError(error));
    }
}

export function* watchLoadStoriesList() {
    yield takeEvery(LOAD_STORIES_LIST, loadStoriesList);
}

export function* watchDeleteStory() {
    yield takeEvery(DELETE_STORY, deleteStory);
}

export function* watchDownloadStoryFile() {
    yield takeEvery(DOWNLOAD_STORY_FILE, downloadStoryFile);
}

export function* watchDownloadStoryFileFromURL() {
    yield takeEvery(DOWNLOAD_STORY_FILE_FROM_URL, downloadStoryFileFromURL);
}

function* storiesListSaga() {
    yield all([
        fork(watchLoadStoriesList),
        fork(watchDeleteStory),
        fork(watchDownloadStoryFile),
        fork(watchDownloadStoryFileFromURL),
    ]);
}

export default storiesListSaga;