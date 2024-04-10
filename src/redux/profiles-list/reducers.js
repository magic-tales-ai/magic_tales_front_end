import { List, Map } from 'immutable';

import {
    LOAD_PROFILES_LIST,
    LOAD_PROFILES_LIST_SUCCESS,
    UPLOAD_PROFILE_IMAGE,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    API_FAILED
} from './constants';

import { createProfile } from './profile';

const INIT_STATE = Map({
    list: new List(),
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

        case UPLOAD_PROFILE_IMAGE:
            console.log(action.payload)
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
                        .setIn([index, 'image'], action.payload.image)
                }
                return list;
            });

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