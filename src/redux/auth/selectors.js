import { createSelector } from 'reselect';

export const selectAuth = createSelector(
    (state) => state.Auth,
    (auth) => ({
        loading: auth.get('loading'),
        isUserLogout: auth.get('isUserLogout'),
        currentEmailField: auth.get('currentEmailField'),
        error: auth.get('error'),
    }),
);