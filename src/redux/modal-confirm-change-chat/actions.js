import {
    OPEN_MODAL,
    CLOSE_MODAL
} from './constants';

export const openModalConfirmChangeChat = ({ title, message, callback }) => ({
    type: OPEN_MODAL,
    payload: { isOpen: true, title, message, callback },
});

export const closeModalConfirmChangeChat = () => ({
    type: CLOSE_MODAL,
});