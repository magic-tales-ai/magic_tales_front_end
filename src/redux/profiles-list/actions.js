import {
    LOAD_PROFILES_LIST,
    LOAD_PROFILES_LIST_SUCCESS,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    PROFILE_API_FAILED,
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

export const profileApiError = ({ profileId, error }) => ({
    type: PROFILE_API_FAILED,
    payload: {
        profileId,
        error
    }
});

export const profilesListApiError = (error) => ({
    type: API_FAILED,
    payload: error
});