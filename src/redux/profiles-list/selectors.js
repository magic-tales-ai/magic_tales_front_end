import { createSelector } from 'reselect';

export const selectProfiles = createSelector(
    (state) => state.ProfilesList,
    (profiles) => ({
        list: profiles.get('list'),
        currentProfile: profiles.get('list').find(profile => profile.get('id') == profiles.get('currentProfileId')),
        loading: profiles.get('loading'),
        error: profiles.get('error'),
    })
);