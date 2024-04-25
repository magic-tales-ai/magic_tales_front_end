import { Record } from 'immutable';

export const Auth = new Record({
    isUserLogout: false,
    tryModeToken: "",
    tryModeId: "",
    currentEmailField: "",
    loading: false,
    error: null
});