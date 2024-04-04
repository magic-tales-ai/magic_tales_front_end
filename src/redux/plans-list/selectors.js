import { createSelector } from 'reselect';

export const selectPlans = createSelector(
    (state) => state.PlansList,
    (plans) => ({
        list: plans.get('list'),
        loading: plans.get('loading'),
        error: plans.get('error'),
    })
);