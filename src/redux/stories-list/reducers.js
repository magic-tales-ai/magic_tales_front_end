import { List, Map } from 'immutable';

import {
    LOAD_STORIES_LIST,
    LOAD_STORIES_LIST_SUCCESS,
    DELETE_STORY,
    DELETE_STORY_SUCCESS,
    API_FAILED
} from './constants';

import { LOGOUT_USER_SUCCESS } from '../auth/constants';

import { createStory } from './story';

const INIT_STATE = Map({
    list: new List(),
    loading: false,
    error: null
});

const StoriesList = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER_SUCCESS:
            return INIT_STATE;
            
        case LOAD_STORIES_LIST:
            return state.set('loading', true);

        case LOAD_STORIES_LIST_SUCCESS:
            const storyRecords = action.payload.map(storyData => createStory(storyData));

            return state.merge({
                list: List(storyRecords),
                loading: false,
                error: null
            });

        case DELETE_STORY:
            return state.set('loading', true);

        case DELETE_STORY_SUCCESS:
            const updatedList = state.get('list').filter(story => story.get('id') !== action.payload.storyId);

            return state.merge({
                list: updatedList,
                loading: false,
                error: null
            });

        case API_FAILED:
            return state.merge({
                loading: false,
                error: action.payload
            });

        default: 
            return state;
    }
}

export default StoriesList;