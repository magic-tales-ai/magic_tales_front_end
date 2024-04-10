import {
    LOAD_PROFILES_LIST,
    LOAD_PROFILES_LIST_SUCCESS,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    API_FAILED
} from './constants';

export const loadProfilesList = () => ({
    type: LOAD_PROFILES_LIST,
})

export const loadProfilesListSuccess = (profilesList) => ({
    type: LOAD_PROFILES_LIST_SUCCESS,
    payload: profilesList
})

export const uploadProfileImage = ({ profileId, image }) => ({
    type: UPLOAD_PROFILE_IMAGE,
    payload: {
        profileId,
        image
    }
})

export const uploadProfileImageSuccess = ({ profileId, image }) => ({
    type: UPLOAD_PROFILE_IMAGE_SUCCESS,
    payload: {
        profileId,
        image
    }
})

export const profilesListApiError = (error) => ({
    type: API_FAILED,
    payload: error
});