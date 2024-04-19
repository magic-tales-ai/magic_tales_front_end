import { createSelector } from 'reselect';

export const selectUser = createSelector(
    (state) => state.User,
    (user) => ({
        user: user?.get('id') ? user : null,
        loading: user?.get('loading') ?? false,
        error: user?.get('error') ?? null
    }),
);