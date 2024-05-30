import {
    LOAD_STORIES_LIST,
    LOAD_STORIES_LIST_SUCCESS,
    DELETE_STORY,
    DELETE_STORY_SUCCESS,
    DOWNLOAD_STORY_FILE,
    API_FAILED
} from './constants';

export const loadStoriesList = () => ({
    type: LOAD_STORIES_LIST,
})

export const loadStoriesListSuccess = (storiesList) => ({
    type: LOAD_STORIES_LIST_SUCCESS,
    payload: storiesList
})

export const deleteStory = (storyId) => ({
    type: DELETE_STORY,
    payload: storyId
})

export const deleteStorySuccess = (storyId) => ({
    type: DELETE_STORY_SUCCESS,
    payload: storyId
})

export const downloadStoryFile = (storyId) => ({
    type: DOWNLOAD_STORY_FILE,
    payload: storyId
})

export const storiesListApiError = (error) => ({
    type: API_FAILED,
    payload: error
});