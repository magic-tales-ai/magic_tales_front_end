import {
    ACTIVE_TALE, NEW_USER_MESSAGE
} from './constants';

export const activeTale = (taleId) => ({
    type: ACTIVE_TALE,
    payload: taleId
});

export const newUserMessage = (message) => ({
    type: NEW_USER_MESSAGE,
    payload: message
});