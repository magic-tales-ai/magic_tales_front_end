import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';


import {
    LOAD_PROFILES_LIST,
    UPLOAD_PROFILE_IMAGE
} from './constants';

import {
    loadProfilesListSuccess,
    uploadProfileImageSuccess,
    profilesListApiError as apiError,
} from './actions';

const get = new APIClient().get;
const create = new APIClient().create;

function* loadProfilesList() {
    try {
        const response = yield call(get, '/profile');
        yield put(loadProfilesListSuccess(response));
    } catch (error) {
        yield put(apiError(error));
    }
}

function* uploadProfileImage({ payload: { profileId, image } }) {
    try {
        const response = yield call(create, `/profile/${profileId}/upload-image`, { image });
        yield put(uploadProfileImageSuccess({ profileId, image: response.image }));
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchLoadProfilesList() {
    yield takeEvery(LOAD_PROFILES_LIST, loadProfilesList);
}

export function* watchUploadProfileImage() {
    yield takeEvery(UPLOAD_PROFILE_IMAGE, uploadProfileImage);
}

function* profilesListSaga() {
    yield all([
        fork(watchLoadProfilesList),
        fork(watchUploadProfileImage),
    ]);
}

export default profilesListSaga;