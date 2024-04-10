import { createSelector } from 'reselect';

export const selectProfiles = createSelector(
    (state) => state.ProfilesList,
    (profiles) => ({
        list: profiles.get('list'),
        loading: profiles.get('loading'),
        error: profiles.get('error'),
    })
);