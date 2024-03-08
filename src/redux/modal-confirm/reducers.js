import {
    OPEN_MODAL,
    CLOSE_MODAL,
    UPDATE_MODAL_CONTENT
} from './constants';

const INIT_STATE = {
    isOpen: false,
    title: '',
    message: '',
    callback: null
};

const ModalConfirm = (state = INIT_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                title: action.payload.title,
                message: action.payload.message,
                callback: action.payload.callback
            };

        case CLOSE_MODAL:
            return INIT_STATE;

        default:
            return state;
    }
};

export default ModalConfirm;