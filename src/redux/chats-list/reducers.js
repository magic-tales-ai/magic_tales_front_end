import { Map } from 'immutable';

import { createNewChat, createNewMessage, recoverChat } from './chat';
import { handleSaveConversationLS, removeConversationByUidLS } from './helper';
import {
    ACTIVE_CHAT, NEW_USER_MESSAGE, CHAT_TYPES
} from './constants';
import { DELETE_STORY_SUCCESS } from '../stories-list/constants';
import { WEBSOCKET_MESSAGE, websocket_commands_messages } from '../websocket/constants';
import { LOGIN_USER_SUCCESS } from '../auth/constants';

export const INIT_STATE = Map({
    activeChat: null,
    chats: new Map()
});

const ChatsList = (state = INIT_STATE, action) => {
    const { payload } = action;   

    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return INIT_STATE;

        case ACTIVE_CHAT:
            return state.set('activeChat', payload);

        case NEW_USER_MESSAGE:
            if (state.get('chats').has(state.get('activeChat'))) {
                const newMessage = createNewMessage({
                    message: payload.message,
                    type: "sender",
                    progressUntilThisMessage: state.getIn(['chats', state.get('activeChat'), 'progress'])
                });

                return state.withMutations(currentState => {
                    currentState.updateIn(['chats', state.get('activeChat')], chat => {
                        console.log(chat)
                        // Update LS on new user message
                        handleSaveConversationLS({ uid: chat.uid, storyParentId: chat.storyParentId, chatType: chat.type });

                        return chat.set('messages', chat.get('messages').push(newMessage))
                            .set('hasUserMessages', true);
                    })
                })
            }
            return state;

        // STORY
        case DELETE_STORY_SUCCESS:
            return state.set('activeChat', null);

        // WS
        case WEBSOCKET_MESSAGE:
            const { message } = payload;
            var newChat = null;
            var newMessage = null;

            switch (message.command) {
                case websocket_commands_messages.NEW_TALE:
                    newChat = createNewChat({
                        type: CHAT_TYPES.get('tale'),
                        ...message,
                    })

                    return state.set('activeChat', newChat.uid)
                        .update('chats', chats => chats.set(newChat.uid, newChat));

                case websocket_commands_messages.SPIN_OFF:
                    newChat = createNewChat({
                        type: CHAT_TYPES.get('spin-off'),
                        ...message
                    })

                    return state.set('activeChat', newChat.uid)
                        .update('chats', chats => chats.set(newChat.uid, newChat));

                case websocket_commands_messages.UPDATE_PROFILE:
                    newChat = createNewChat({
                        type: CHAT_TYPES.get('update-profile'),
                        ...message
                    })

                    return state.set('activeChat', newChat.uid)
                        .update('chats', chats => chats.set(newChat.uid, newChat));

                case websocket_commands_messages.USER_MESSAGE:
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

                case websocket_commands_messages.MESSAGE_FOR_HUMAN:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            const newMessage = createNewMessage({
                                ...message,
                                type: "receiver",
                                progressUntilThisMessage: chat?.get('progress')
                            });

                            return chat?.set('messages', chat?.get('messages').push(newMessage));
                        });
                    });

                case websocket_commands_messages.PROGRESS_UPDATE:
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

                case websocket_commands_messages.DONE:
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

                case websocket_commands_messages.STATUS_UPDATE:
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

                case websocket_commands_messages.ASK_FOR_REGISTRATION:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            newMessage = createNewMessage({
                                ...message,
                                type: "receiver",
                                progressUntilThisMessage: chat.get('progress')
                            });

                            return chat.set('messages', chat.get('messages').push(newMessage))
                                .set('loginRequired', true);
                        });
                    })

                case websocket_commands_messages.AI_IS_WORKING:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            return chat?.set('aiIsWorking', true);
                        });
                    })

                case websocket_commands_messages.AI_DONE_WORKING:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['chats', message.uid], chat => {
                            return chat?.set('aiIsWorking', false);
                        });
                    })

                case websocket_commands_messages.CONVERSATION_RECOVERY:
                    if(!payload.ack) {// Temporary fix, now recovery can bring another recovery command
                        return state.withMutations(currentState => {
                            currentState.updateIn(['chats', message.uid], _ => {
                                return recoverChat(message);
                            })
                        })
                    } 
                    
                    return state

                default:
                    return state;
            }

        default:
            return state;
    }
}

export default ChatsList;