import { createSelector } from 'reselect';

export const selectLayout = createSelector(
    (state) => state.Layout,
    (layout) => ({
        activeTab: layout.get('activeTab'),
        mode: layout.get('layoutMode'),
    })
);