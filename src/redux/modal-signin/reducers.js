import { Map } from 'immutable';

import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_VIEW
} from './constants';

const INIT_STATE = Map({
    isOpen: false,
    view: 'login'
});

const ModalSignIn = (state = INIT_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return state.merge({
                isOpen: true,
                view: action.payload?.view || INIT_STATE.get('view')
            });

        case CLOSE_MODAL:
            return state.set('isOpen', false);

        case SET_VIEW:
            return state.set('view', action.payload.view);

        default:
            return state;
    }
};

export default ModalSignIn;