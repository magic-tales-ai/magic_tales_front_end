import {
    OPEN_MODAL,
    CLOSE_MODAL
} from './constants';

export const openModal = ({ title, message, callback }) => ({
    type: OPEN_MODAL,
    payload: { isOpen: true, title, message, callback },
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});