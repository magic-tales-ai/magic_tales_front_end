import { createSelector } from 'reselect';

export const selectChatsList = createSelector(
    (state) => state.ChatsList,
    (chatsList) => ({
        activeChat: chatsList.get('activeChat'),
        chats: chatsList.get('chats'),
        currentChat: chatsList.get('activeChat') 
            ? chatsList.get('chats').get(chatsList.get('activeChat'))
            : null
    })
);