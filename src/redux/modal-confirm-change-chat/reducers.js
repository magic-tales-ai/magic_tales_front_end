import { Map } from 'immutable';

import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from './constants';

const INIT_STATE = Map({
    isOpen: false,
    title: 'Are you sure?',
    message: 'If you start a new conversation you will lose the current one',
    callback: null
});

const ModalConfirm = (state = INIT_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return state.merge({
                isOpen: true,
                callback: action.payload.callback
            });

        case CLOSE_MODAL:
            return INIT_STATE;

        default:
            return state;
    }
};

export default ModalConfirm;