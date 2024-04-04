import { Map } from 'immutable';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    UPDATE_TOKEN,
    LOAD_MONTH_STORIES_COUNT_SUCCESS,
    API_FAILED
} from './constants';

import { WEBSOCKET_MESSAGE } from '../websocket/constants';

import { setAuthorization } from '../../helpers/apiClient';

import { getLoggedInUser, updateTokenLoggedInUser } from '../../helpers/authUtils';

import { createNewUser } from './user';

const INIT_STATE = Map({
    user: createNewUser(getLoggedInUser()),
    loading: false,
    isUserLogout: false,
    error: null
});

const Auth = (state = INIT_STATE, action) => {
    if (action?.payload?.token) {
        setAuthorization(action.payload.token);
    }

    switch (action.type) {
        case LOGIN_USER:
            return state.set('loading', true);

        case LOGIN_USER_SUCCESS:
            return state.merge({
                user: createNewUser(action.payload),
                loading: false,
                error: null
            });

        case REGISTER_USER:
            return state.set('loading', true);

        case REGISTER_USER_SUCCESS:
            return state.merge({
                loading: false,
                error: null
            });

        case LOGOUT_USER_SUCCESS:
            return state.merge({
                user: null,
                isUserLogout: true
            });

        case FORGET_PASSWORD:
            return state.set('loading', true);

        case FORGET_PASSWORD_SUCCESS:
            return state.merge({
                passwordResetStatus: action.payload,
                loading: false,
                error: null
            });

        case UPDATE_TOKEN:
            updateTokenLoggedInUser(action.payload);
            return state.update('user', user => user.set('token', action.payload));

        case LOAD_MONTH_STORIES_COUNT_SUCCESS:
            return state.update('user', user => user.set('monthStoriesCount', action.payload.stories_this_month));

        case API_FAILED:
            return state.merge({
                loading: false,
                error: action.payload,
                isUserLogout: false
            });

        case WEBSOCKET_MESSAGE:
            const token = action.payload?.message?.token;

            if (token) {
                updateTokenLoggedInUser(token);
                return state.update('user', user => user.set('token', token))
            }
            return state;

        default:
            return state;
    }
};


export default Auth;