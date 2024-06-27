import { List, Record, Map } from 'immutable';
import { v4 as uuidv4 } from 'uuid';

import ChatReducer, { INIT_STATE as INIT_STATE_CHAT } from './reducers';
import { WEBSOCKET_MESSAGE } from '../websocket/constants';

export const Chat = new Record({
    uid: null,
    type: '',
    progress: 0,
    profilePicture: '',
    unRead: 0,
    showProgressBar: true,
    isFinished: false,
    loginRequired: false,
    hasUserMessages: false,
    numberProgressUpdate: 0,
    storyId: null,
    storyParentId: null,
    aiIsWorking: false,
    messages: new List(),
});

export const createNewChat = (data) => {
    let messages = data?.messages ? data?.messages.map((message) => createNewMessage(message)) : [];

    return new Chat({
        ...data,
        messages: new List(messages),
        storyId: data?.data?.story_id ? data.data.story_id : null,
        storyParentId: data?.data?.story_parent_id ? data.data.story_parent_id : null,
    })
}

export const recoverChat = ({ uid, data }) => {
    var state = INIT_STATE_CHAT
        .set('activeChat', uid)
        .set('chats', new Map([[uid, createNewChat({ uid })]]))

    data?.conversations?.map(interaction => {
        const { command, details } = interaction;
        const { token, ...detailsWithoutToken } = details;

        let action = {
            type: WEBSOCKET_MESSAGE,
            payload: {
                uid,
                command,
                message: {...detailsWithoutToken, uid}
            }
        }

        state = ChatReducer(state, action)
    })

    return state.get('chats').first();
}

export const Message = new Record({
    id: uuidv4(),
    message: '',
    files: '',
    size: '',
    type: '',
    images: '',
    isFileMessage: false,
    isImageMessage: false,
    firstProgressUpdate: false,
    progressUntilThisMessage: 0
});

export const createNewMessage = (data) => {
    return new Message({
        ...data,
        isFileMessage: data?.files ? true : false,
        isImageMessage: false,
        firstProgressUpdate: data?.firstProgressUpdate === true,
    })
}