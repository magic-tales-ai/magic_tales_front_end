import { Record } from 'immutable';

export const Auth = new Record({
    loading: false,
    isUserLogout: false,
    currentEmailField: "",
    error: null
});