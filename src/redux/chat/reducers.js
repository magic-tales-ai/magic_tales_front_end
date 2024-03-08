import { Map } from 'immutable';

import { createNewTale, createNewMessage, recoverTale } from './tale';
import { handleSaveConversationLS, removeConversationByUid } from './helper';
import {
    ACTIVE_TALE, NEW_USER_MESSAGE
} from './constants';

import { WEBSOCKET_MESSAGE } from '../websocket/constants';
import { websocketMessagesActions } from './constants';

export const INIT_STATE = Map({
    active_tale: null,
    tales: new Map()
});

const Chat = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIVE_TALE:
            return state.set('active_tale', action.payload);

        case NEW_USER_MESSAGE:
            const { payload } = action;

            if (state.get('tales').has(state.get('active_tale'))) {
                const newMessage = createNewMessage({
                    message: payload.message,
                    type: "sender",
                    progressUntilThisMessage: state.getIn(['tales', state.get('active_tale'), 'progress'])
                });

                // Update LS on new user message
                handleSaveConversationLS({ uid: state.get('active_tale'), storyParentId: state.get('storyParentId') });

                return state.withMutations(currentState => {
                    currentState.updateIn(['tales', state.get('active_tale')], tale => {
                        return tale.set('messages', tale.get('messages').push(newMessage))
                            .set('hasUserMessages', true);
                    })
                })
            }

        // WS
        case WEBSOCKET_MESSAGE:
            const { message } = action.payload;
            var newTale = null;
            var newMessage = null;

            switch (message.command) {
                case websocketMessagesActions.NEW_TALE:
                    newTale = createNewTale({
                        ...message,
                    })

                    return state.set('active_tale', newTale.uid)
                        .update('tales', tales => tales.set(newTale.uid, newTale));

                case websocketMessagesActions.SPIN_OFF:
                    newTale = createNewTale({
                        ...message,
                        name: 'Spin-Off'
                    })

                    // Update LS on new spin off
                    handleSaveConversationLS({ uid: newTale.uid, storyParentId: newTale.story_parent_id });

                    return state.set('active_tale', newTale.uid)
                        .update('tales', tales => tales.set(newTale.uid, newTale));

                case websocketMessagesActions.USER_MESSAGE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['tales', message.uid], tale => {
                            const newMessage = createNewMessage({
                                ...message,
                                type: "sender",
                                progressUntilThisMessage: tale.get('progress')
                            });

                            return tale.set('messages', tale.get('messages').push(newMessage))
                                .set('hasUserMessages', true);
                        });
                    });

                case websocketMessagesActions.MESSAGE_FOR_HUMAN:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['tales', message.uid], tale => {
                            const newMessage = createNewMessage({
                                ...message,
                                type: "receiver",
                                progressUntilThisMessage: tale.get('progress')
                            });

                            return tale.set('messages', tale.get('messages').push(newMessage));
                        });
                    });

                case websocketMessagesActions.PROGRESS_UPDATE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['tales', message.uid], tale => {
                            const numberProgressUpdate = (tale.get('numberProgressUpdate') || 0) + 1;
                            newMessage = createNewMessage({
                                message: message.message,
                                type: "system",
                                firstProgressUpdate: numberProgressUpdate === 1,
                                progressUntilThisMessage: message.progress_percent
                            });

                            return tale.set('progress', message.progress_percent)
                                .set('numberProgressUpdate', numberProgressUpdate)
                                .set('messages', tale.get('messages').push(newMessage));
                        });
                    })

                case websocketMessagesActions.DONE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['tales', message.uid], tale => {
                            newMessage = createNewMessage({
                                ...message,
                                type: "receiver",
                                progressUntilThisMessage: tale.get('progress')
                            });

                            // Delete conversation from LS
                            removeConversationByUid(message.uid);

                            return tale.set('isFinished', true)
                                .set('storyId', message.data?.story_id)
                                .set('messages', tale.get('messages').push(newMessage));
                        });
                    })

                case websocketMessagesActions.STATUS_UPDATE:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['tales', message.uid], tale => {
                            newMessage = createNewMessage({
                                message: message.message,
                                type: "status",
                                progressUntilThisMessage: tale.get('progress')
                            });

                            return tale.set('messages', tale.get('messages').push(newMessage));
                        })
                    })

                case websocketMessagesActions.CONVERSATION_RECOVERY:
                    return state.withMutations(currentState => {
                        currentState.updateIn(['tales', message.uid], _ => {
                            return recoverTale(message);
                        })
                    })

                default:
                    return state;
            }

        default:
            return state;
    }
}

export default Chat;