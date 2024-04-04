import {
    ACTIVE_CHAT, NEW_USER_MESSAGE
} from './constants';

export const setActiveChat = (chatId) => ({
    type: ACTIVE_CHAT,
    payload: chatId
});

export const newUserMessage = (message) => ({
    type: NEW_USER_MESSAGE,
    payload: message
});