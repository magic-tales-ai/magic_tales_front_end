import { createSelector } from 'reselect';

export const selectAuth = createSelector(
    (state) => state.Auth,
    (auth) => ({
        loading: auth.get('loading'),
        isUserLogout: auth.get('isUserLogout'),
        currentEmailField: auth.get('currentEmailField'),
        tryModeToken: auth.get('tryModeToken'),
        tryModeId: auth.get('tryModeId'),
        error: auth.get('error'),
    }),
);