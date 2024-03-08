import { List, Record, Map } from 'immutable';
import { v4 as uuidv4 } from 'uuid';

import Chat, { INIT_STATE as INIT_STATE_CHAT } from './reducers';

export const Tale = new Record({
    uid: null,
    name: 'New Tale',
    progress: 0,
    profilePicture: '',
    unRead: 0,
    showProgressBar: true,
    isFinished: false,
    hasUserMessages: false,
    numberProgressUptate: 0,
    storyId: null,
    storyParentId: null,
    messages: new List(),
});

export const createNewTale = (data) => {
    let messages = data?.messages ? data?.messages.map((message) => createNewMessage(message)) : [];

    return new Tale({
        ...data,
        messages: new List(messages),
        storyId: data?.data?.story_id ? data.data.story_id : null,
        storyParentId: data?.data?.story_parent_id ? data.data.story_parent_id : null,
    })
}

export const recoverTale = ({ uid, data }) => {
    var state = INIT_STATE_CHAT
        .set('active_tale', uid)
        .set('tales', new Map([[uid, createNewTale({ uid })]]))

    data.conversations?.map(interaction => {
        const { command, details } = interaction;
        const { token, ...detailsWithoutToken } = details

        let action = {
            type: 'WEBSOCKET_MESSAGE', 
            payload: {
                uid,
                command,
                message: {...detailsWithoutToken, uid}
            }
        }

        state = Chat(state, action)
    })

    return state.get('tales').first();
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
        isImageMessage: data?.images ? true : false,
        firstProgressUpdate: data?.firstProgressUpdate === true,
    })
}