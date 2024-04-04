import { List, Map } from 'immutable';

import {
    LOAD_PLANS_LIST,
    LOAD_PLANS_LIST_SUCCESS,
    API_FAILED
} from './constants';

import { createPlan } from './plan';

const INIT_STATE = Map({
    list: new List(),
    loading: false,
    error: null
});

const PlansList = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_PLANS_LIST:
            return state.set('loading', true);

        case LOAD_PLANS_LIST_SUCCESS:
            const planRecords = action.payload.map(planData => createPlan(planData));

            return state.merge({
                list: List(planRecords),
                loading: false,
                error: null
            });

        case API_FAILED:
            return state.merge({
                loading: false,
                error: action.payload
            });

        default:
            return state;
    }
};

export default PlansList;