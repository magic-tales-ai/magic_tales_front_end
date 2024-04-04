import { createSelector } from 'reselect';

export const selectModalSignIn= createSelector(
    (state) => state.ModalSignIn,
    (modalSignIn) => ({
        isOpen: modalSignIn.get('isOpen'),
        view: modalSignIn.get('view'),
    })
);