import {
    LOAD_PLANS_LIST,
    LOAD_PLANS_LIST_SUCCESS,
    API_FAILED
} from './constants';

export const loadPlansList = () => ({
    type: LOAD_PLANS_LIST,
})

export const loadPlansListSuccess = (plansList) => ({
    type: LOAD_PLANS_LIST_SUCCESS,
    payload: plansList
})

export const plansListApiError = (error) => ({
    type: API_FAILED,
    payload: error
});