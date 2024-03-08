import { List } from 'immutable';
import {
    LOAD_STORIES_LIST,
    LOAD_STORIES_LIST_SUCCESS,
    DELETE_STORY,
    DELETE_STORY_SUCCESS,
    API_FAILED
} from './constants';

import { LOGOUT_USER_SUCCESS } from '../auth/constants';

const INIT_STATE = {
    list: new List(),
    loading: false
};

const StoriesList = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER_SUCCESS:
            return INIT_STATE;
            
        case LOAD_STORIES_LIST:
            return { ...state, loading: true };
        case LOAD_STORIES_LIST_SUCCESS:
            return { ...state, list: action.payload, loading: false, error: null };

        case DELETE_STORY:
            return { ...state, loading: true };
        case DELETE_STORY_SUCCESS:
            let auxList = state.list.filter(story => story.id !== action.payload.storyId);
            return { ...state, list: auxList, loading: false, error: null };

        case API_FAILED:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}

export default StoriesList;