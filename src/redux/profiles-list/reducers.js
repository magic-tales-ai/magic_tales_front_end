import { List, Map } from 'immutable';

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

import { createProfile } from './profile';

const INIT_STATE = Map({
    list: new List(),
    currentProfileId: null,
    loading: false,
    error: null
});

const ProfilesList = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_PROFILES_LIST:
            return state.set('loading', true);

        case LOAD_PROFILES_LIST_SUCCESS:
            const profileRecords = action.payload.map(profileData => createProfile(profileData));

            return state.merge({
                list: List(profileRecords),
                loading: false,
                error: null
            });
        
        case SET_CURRENT_PROFILE_ID:
            return state.set('currentProfileId', action.payload);

        case UPLOAD_PROFILE_IMAGE:
            return state.update('list', list => {
                const index = list.findIndex(profile => profile.get('id') === action.payload.profileId);
                if (index !== -1) {
                    return list.setIn([index, 'loading'], true);
                }
                return list;
            });

        case UPLOAD_PROFILE_IMAGE_SUCCESS:
            return state.update('list', list => {
                const index = list.findIndex(profile => profile.get('id') === action.payload.profileId);
                if (index !== -1) {
                    return list.setIn([index, 'loading'], false)
                        .setIn([index, 'error'], null)
                        .setIn([index, 'image'], action.payload.image)
                }
                return list;
            })
        
        case DELETE_PROFILE:
            return state.update('list', list => {
                const index = list.findIndex(profile => profile.get('id') === action.payload.profileId);
                if (index !== -1) {
                    return list.setIn([index, 'loading'], true)
                }
                return list;
            })
    
        case DELETE_PROFILE_SUCCESS:
            const updatedList = state.get('list').filter(profile => profile.get('id') !== action.payload.profileId);

            return state.merge({
                list: updatedList,
                loading: false,
                error: null
            });

        case PROFILE_API_FAILED:
            return state.update('list', list => {
                const index = list.findIndex(profile => profile.get('id') === action.payload.profileId);
                if (index !== -1) {
                    return list.setIn([index, 'loading'], false)
                        .setIn([index, 'error'], action.payload.error)
                }
                return list;
            })

        case API_FAILED:
            return state.merge({
                loading: false,
                error: action.payload
            });

        default:
            return state;
    }
};

export default ProfilesList;