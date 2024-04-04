import { createSelector } from 'reselect';

export const selectModalConfirm = createSelector(
    (state) => state.ModalConfirm,
    (modalConfirm) => ({
        isOpen: modalConfirm.get('isOpen'),
        title: modalConfirm.get('title'),
        message: modalConfirm.get('message'),
        callback: modalConfirm.get('callback'),
    })
);