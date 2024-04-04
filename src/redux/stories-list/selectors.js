import { createSelector } from 'reselect';

export const selectStories = createSelector(
    (state) => state.StoriesList,
    (stories) => ({
        list: stories.get('list'),
        loading: stories.get('loading'),
        error: stories.get('error'),
    })
);