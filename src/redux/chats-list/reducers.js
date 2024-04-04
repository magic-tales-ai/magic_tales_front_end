import { Map } from 'immutable';

import { createNewChat, createNewMessage, recoverChat } from './chat';
import { handleSaveConversationLS, removeConversationByUidLS } from './helper';
import {
    ACTIVE_CHAT, NEW_USER_MESSAGE
} from './constants';
import { DELETE_STORY_SUCCESS } from '../stories-list/constants';

import { WEBSOCKET_MESSAGE } from '../websocket/constants';
import { websocketMessagesActions } from './constants';

export const INIT_STATE = Map({
    activeChat: null,
    chats: new Map()
});

const ChatsList = (state = INIT_STATE, action) => {
    const { payload } = action;

    switch (action.type) {
        case ACTIVE_CHAT:
            removeConversationByUidLS(state.get('activeChat'));
            return state.set('activeChat', payload);

        case NEW_USER_MESSAGE:
            if (state.get('chats').has(state.get('activeChat'))) {
                const newMessage = createNewMessage({
                    message: payload.message,
                    type: "sender",
                    progressUntilThisMessage: state.getIn(['chats', state.get('activeChat'), 'progress'])
                });

                // Update LS on new user message
                handleSaveConversationLS({ uid: state.get('activeChat'), storyParentId: state.get('storyParentId') });

                return state.withMutations(currentState => {
                    currentState.updateIn(['chats', state.get('activeChat')], chat => {
                        return chat.set('messages', chat.get('messages').push(newMessage))
                            .set('hasUserMessages', true);
                    })
                })
            }

        // STORY
        case DELETE_STORY_SUCCESS:
            return state.set('activeChat', null);

        // WS
        case WEBSOCKET_MESSAGE:
            const { message } = payload;
            var newChat = null;
            var newMessage = null;

            switch (message.command) {
                case websocketMessagesActions.NEW_TALE:
                    newChat = createNewChat({
                        ...message,
                    })

                    return state.set('activeChat', newChat.uid)
                        .update('chats', chats => chats.set(newChat.uid, newChat));

                case websocketMessagesActions.SPIN_OFF:
                    newChat = createNewChat({
                        ...message,
                        name: 'Spin-Off'
                    })

                    // Update LS on new spin off
                    handleSaveConversationLS({ uid: newChat.uid, storyParentId: newChat.story_parent_id });

                    return state.set('activeChat', newChat.uid)
                        .update('chats', chats => chats.set(newChat.uid, newChat));

                case websocketMessagesActions.USER_MESSAGE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            const newMessage = createNewMessage({
                                ...message,
                                type: "sender",
                                progressUntilThisMessage: chat.get('progress')
                            });

                            return chat.set('messages', chat.get('messages').push(newMessage))
                                .set('hasUserMessages', true);
                        });
                    });

                case websocketMessagesActions.MESSAGE_FOR_HUMAN:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            const newMessage = createNewMessage({
                                ...message,
                                type: "receiver",
                                progressUntilThisMessage: chat.get('progress')
                            });

                            return chat.set('messages', chat.get('messages').push(newMessage));
                        });
                    });

                case websocketMessagesActions.PROGRESS_UPDATE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            const numberProgressUpdate = (chat.get('numberProgressUpdate') || 0) + 1;
                            newMessage = createNewMessage({
                                message: message.message,
                                type: "system",
                                firstProgressUpdate: numberProgressUpdate === 1,
                                progressUntilThisMessage: message.progress_percent
                            });

                            return chat.set('progress', message.progress_percent)
                                .set('numberProgressUpdate', numberProgressUpdate)
                                .set('messages', chat.get('messages').push(newMessage));
                        });
                    })

                case websocketMessagesActions.DONE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            newMessage = createNewMessage({
                                ...message,
                                type: "receiver",
                                progressUntilThisMessage: chat.get('progress')
                            });

                            // Delete conversation from LS
                            removeConversationByUidLS(message.uid);

                            return chat.set('isFinished', true)
                                .set('storyId', message.data?.story_id)
                                .set('messages', chat.get('messages').push(newMessage));
                        });
                    })

                case websocketMessagesActions.STATUS_UPDATE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            newMessage = createNewMessage({
                                message: message.message,
                                type: "status",
                                progressUntilThisMessage: chat.get('progress')
                            });

                            return chat.set('messages', chat.get('messages').push(newMessage));
                        })
                    })

                case websocketMessagesActions.CONVERSATION_RECOVERY:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], _ => {
                            return recoverChat(message);
                        })
                    })

                default:
                    return state;
            }

        default:
            return state;
    }
}

export default ChatsList;