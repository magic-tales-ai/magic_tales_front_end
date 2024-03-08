import {
    LOAD_PLANS_LIST,
    LOAD_PLANS_LIST_SUCCESS,
    API_FAILED
} from './constants';
import { List } from 'immutable';

const INIT_STATE = {
    list: new List(),
    loading: false
};


const PlansList = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_PLANS_LIST:
            return { ...state, loading: true };
        case LOAD_PLANS_LIST_SUCCESS:
            return { ...state, list: action.payload, loading: false, error: null };

        case API_FAILED:
            return { ...state, loading: false, error: action.payload };

        default: return { ...state };
    }
}

export default PlansList;