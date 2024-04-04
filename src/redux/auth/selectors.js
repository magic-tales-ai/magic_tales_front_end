import { createSelector } from 'reselect';

export const selectAuth = createSelector(
    (state) => state.Auth,
    (auth) => ({
        user: auth.get('user'),
        loading: auth.get('loading'),
        isUserLogout: auth.get('isUserLogout'),
        error: auth.get('error'),
    }),
);