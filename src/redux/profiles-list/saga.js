import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';


import {
    DELETE_PROFILE,
    LOAD_PROFILES_LIST,
    UPLOAD_PROFILE_IMAGE
} from './constants';

import {
    loadProfilesListSuccess,
    uploadProfileImageSuccess,
    deleteProfileSuccess,
    profileApiError,
    profilesListApiError as apiError,
} from './actions';

import { 
    WEBSOCKET_MESSAGE,
    websocket_commands_messages
} from '../websocket/constants';

const apiClient = new APIClient();

function* loadProfilesList({ payload }) {
    try {
        if(!payload || websocket_commands_messages.PROFILE_UPDATED === payload.message?.command) {
            const response = yield call(apiClient.get, '/profile');
            yield put(loadProfilesListSuccess(response));
        }
    } catch (error) {
        yield put(apiError(error));
    }
}

function* uploadProfileImage({ payload: { profileId, image } }) {
    try {
        const response = yield call(apiClient.create, `/profile/${profileId}/upload-image`, { image });
        yield put(uploadProfileImageSuccess({ profileId, image: response.image }));
    } catch (error) {
        yield put(profileApiError({profileId, error}));
    }
}

function* deleteProfile({ payload: { profileId } }) {
    try {
        yield call(apiClient.delete, `/profile/${profileId}`);
        yield put(deleteProfileSuccess({ profileId }));
    } catch (error) {
        yield put(profileApiError({profileId, error}));
    }
}

export function* watchLoadProfilesList() {
    yield takeEvery([LOAD_PROFILES_LIST, WEBSOCKET_MESSAGE], loadProfilesList);
}

export function* watchUploadProfileImage() {
    yield takeEvery(UPLOAD_PROFILE_IMAGE, uploadProfileImage);
}

export function* watchDeleteProfile() {
    yield takeEvery(DELETE_PROFILE, deleteProfile);
}

function* profilesListSaga() {
    yield all([
        fork(watchLoadProfilesList),
        fork(watchUploadProfileImage),
        fork(watchDeleteProfile),
    ]);
}

export default profilesListSaga;