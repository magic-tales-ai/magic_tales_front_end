import {
    UPDATE_TOKEN,
    LOAD_MONTH_STORIES_COUNT_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    VALIDATE_NEW_USER_EMAIL,
    VALIDATE_NEW_USER_EMAIL_SUCCESS,
    CHANGE_PASSWORD_LOGGED_USER,
    CHANGE_PASSWORD_LOGGED_USER_SUCCESS,
    USER_API_FAILED
} from './constants';

import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS
} from '../auth/constants'

import { WEBSOCKET_MESSAGE } from '../websocket/constants';

import { setAuthorization } from '../../helpers/apiClient';

import { getLoggedInUser, updateTokenLoggedInUser } from '../../helpers/authUtils';

import { createNewUser, User as UserRecord } from './user';

const INIT_STATE = getLoggedInUser() 
    ? createNewUser(getLoggedInUser())
    : new UserRecord();

const User = (state = INIT_STATE, action) => {
    if (action?.payload?.token) {
        setAuthorization(action.payload.token);
    }

    switch (action.type) {
        case UPDATE_TOKEN:
            updateTokenLoggedInUser(action.payload);
            return state.set('token', action.payload);
        
        case LOGIN_USER_SUCCESS:
            return createNewUser(action.payload);
        
        case LOGOUT_USER_SUCCESS:
            return createNewUser();

        case UPDATE_USER:
        case VALIDATE_NEW_USER_EMAIL:
        case CHANGE_PASSWORD_LOGGED_USER:
            return state.set('loading', true);

        case LOAD_MONTH_STORIES_COUNT_SUCCESS:
            return state.set('monthStoriesCount', action.payload.stories_this_month);

        case UPDATE_USER_SUCCESS:
        case VALIDATE_NEW_USER_EMAIL_SUCCESS:
            return state.merge({
                ...action.payload,
                loading: false,
                error: null
            })


        case CHANGE_PASSWORD_LOGGED_USER_SUCCESS:
            return state.merge({
                loading: false,
                error: null
            });

        case USER_API_FAILED:
            return state.merge({
                loading: false,
                error: action.payload,
            });

        case WEBSOCKET_MESSAGE:
            const token = action.payload?.message?.token;

            if (token) {
                updateTokenLoggedInUser(token);
                return state.set('token', token);
            }
            return state;

        default:
            return state;
    }
};


export default User;