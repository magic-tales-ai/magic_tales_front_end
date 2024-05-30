import {
    LOAD_PROFILES_LIST,
    LOAD_PROFILES_LIST_SUCCESS,
    SET_CURRENT_PROFILE_ID,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    DELETE_PROFILE,
    DELETE_PROFILE_SUCCESS,
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

export const setCurrentProfileId = (profileId) => ({
    type: SET_CURRENT_PROFILE_ID,
    payload: profileId
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

export const deleteProfile = ({ profileId }) => ({
    type: DELETE_PROFILE,
    payload: { 
        profileId
    }
})

export const deleteProfileSuccess = ({ profileId }) => ({
    type: DELETE_PROFILE_SUCCESS,
    payload: { 
        profileId
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