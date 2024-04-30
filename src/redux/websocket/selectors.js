import { createSelector } from 'reselect';

export const selectCurrentChatWebsocket = createSelector(
    (state) => state.Websocket,
    (state) => state.ChatsList,
    (Websocket, ChatsList) => ({
        currentChatWebsocket: Websocket.get(ChatsList.get('activeChat'))
    })
);