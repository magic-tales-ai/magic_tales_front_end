import { Map } from 'immutable';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    VALIDATE_USER_REGISTER,
    VALIDATE_USER_REGISTER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    UPDATE_TOKEN,
    LOAD_MONTH_STORIES_COUNT_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    VALIDATE_NEW_USER_EMAIL,
    VALIDATE_NEW_USER_EMAIL_SUCCESS,
    CHANGE_PASSWORD_LOGGED_USER,
    CHANGE_PASSWORD_LOGGED_USER_SUCCESS,
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
    currentEmailField: "",
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
            return state.set('loading', true)
                .set('currentEmailField', action.payload.user.email);

        case REGISTER_USER_SUCCESS:
            return state.merge({
                loading: false,
                error: null
            });

        case VALIDATE_USER_REGISTER:
            return state.set('loading', true);

        case VALIDATE_USER_REGISTER_SUCCESS:
            return state.merge({
                currentEmailField: "",
                loading: false,
                error: null
            });

        case FORGET_PASSWORD:
            return state.set('loading', true)
                .set('currentEmailField', action.payload.email);

        case FORGET_PASSWORD_SUCCESS:
            return state.merge({
                loading: false,
                error: null
            });

        case CHANGE_PASSWORD:
            return state.set('loading', true);
    
        case CHANGE_PASSWORD_SUCCESS:
            return state.merge({
                currentEmailField: "",
                loading: false,
                error: null
            });

        /* logged */

        case LOGOUT_USER_SUCCESS:
            return state.merge({
                user: null,
                isUserLogout: true
            });

        case UPDATE_TOKEN:
            updateTokenLoggedInUser(action.payload);
            return state.update('user', user => user.set('token', action.payload));

        case LOAD_MONTH_STORIES_COUNT_SUCCESS:
            return state.update('user', user => user.set('monthStoriesCount', action.payload.stories_this_month));

        case UPDATE_USER:
            return state.set('loading', true);

        case UPDATE_USER_SUCCESS:
            return state.set('loading', false)
                .set('error', null)
                .update('user', user => createNewUser({ ...action.payload, token: user.get('token')}));

        case VALIDATE_NEW_USER_EMAIL:
            return state.set('loading', true);

        case VALIDATE_NEW_USER_EMAIL_SUCCESS:
            return state.update('loading', () => false)
                .update('user', user => user.set('email', action.payload.email));

        case CHANGE_PASSWORD_LOGGED_USER:
            return state.set('loading', true);

        case CHANGE_PASSWORD_LOGGED_USER_SUCCESS:
            return state.merge({
                loading: false,
                error: null
            });

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