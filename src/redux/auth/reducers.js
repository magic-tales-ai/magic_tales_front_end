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
    API_FAILED,
    CREATE_USER_TRY_MODE,
    CREATE_USER_TRY_MODE_SUCCESS
} from './constants';

import { setAuthorization } from '../../helpers/apiClient';

import { Auth as AuthRecord } from './auth';

const Auth = (state = new AuthRecord, action) => {
    if (action?.payload?.token) {
        setAuthorization(action.payload.token);
    }

    switch (action.type) {
        case LOGIN_USER:
        case VALIDATE_USER_REGISTER:
        case CHANGE_PASSWORD:
        case CREATE_USER_TRY_MODE:
            return state.set('loading', true);

        case LOGIN_USER_SUCCESS:
            return state.merge({
                loading: false,
                error: null,
                tryModeToken: null,
                tryModeId: null
            });

        case LOGOUT_USER_SUCCESS:
            return state.merge({
                user: null,
                isUserLogout: true
            });

        case REGISTER_USER:
            return state.set('loading', true)
                .set('currentEmailField', action.payload.user.email);

        case REGISTER_USER_SUCCESS:
            return state.merge({
                loading: false,
                error: null
            });

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
    
        case CHANGE_PASSWORD_SUCCESS:
            return state.merge({
                currentEmailField: "",
                loading: false,
                error: null
            });

        case CREATE_USER_TRY_MODE_SUCCESS:
            return state.merge({
                loading: false,
                error: null,
                tryModeToken: action.payload.token,
                tryModeId: action.payload.userId
            });

        case API_FAILED:
            return state.merge({
                loading: false,
                error: action.payload,
                isUserLogout: false
            });

        default:
            return state;
    }
};


export default Auth;