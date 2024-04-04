import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_VIEW
} from './constants';

export const openModalSignin = ({ view } = { view: 'login' }) => ({
    type: OPEN_MODAL,
    payload: { isOpen: true, view },
});

export const closeModalSignin = () => ({
    type: CLOSE_MODAL,
});

export const setView = ({ view }) => ({
    type: SET_VIEW,
    payload: { view }
});
