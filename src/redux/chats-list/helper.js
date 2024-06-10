import { getLoggedInUser } from "../../helpers/authUtils";
import { CHAT_TYPES } from "./constants";

function handleSaveConversationLS({ uid, storyParentId = null, chatType }) {
    if (!uid || chatType === CHAT_TYPES.get('update-profile')) {
        return;
    }

    const user = getLoggedInUser();
    const propName = user ? user.id + 'userConversationData' : 'guestConversationData';
    const conversationData = JSON.parse(localStorage.getItem(propName));

    if (conversationData?.uid !== uid) {
        localStorage.setItem(propName, JSON.stringify({
            userId: user?.id ?? null,
            uid,
            storyParentId,
        }));
    }
}

function getConversationLS() {
    const user = getLoggedInUser();
    var conversation;

    if(user) {
        conversation = JSON.parse(localStorage.getItem(user.id + 'userConversationData'));
    }
    else {
        conversation = JSON.parse(localStorage.getItem('guestConversationData'));
    }

    return conversation;
}

function moveGuestToUserConversation({ userId }) {
    const id = userId || getLoggedInUser()?.id;
    const guestConversation = JSON.parse(localStorage.getItem('guestConversationData'));
    
    if(id && guestConversation) {
        guestConversation.userId = id;
        localStorage.setItem(id + 'userConversationData', JSON.stringify(guestConversation));
        localStorage.removeItem('guestConversationData');
    }
}

function getDataRecovery() {
    const conversation = getConversationLS();

    var dataRecovery = {
        canRecover: conversation ? true : false,
        uid: conversation?.uid ?? null,
    }

    return dataRecovery;
}

function removeConversationByUidLS(uid) {
    if(!uid) {
        return;
    }
    
    const guestConversation = JSON.parse(localStorage.getItem('guestConversationData'));
    if(guestConversation?.uid == uid) {
        localStorage.removeItem('guestConversationData');
    }

    const user = getLoggedInUser();
    const userConversation = JSON.parse(localStorage.getItem(user?.id + 'userConversationData'));
    if(userConversation?.uid == uid) {
        localStorage.removeItem(user.id + 'userConversationData')
    }
}

function requirementsForNewChat({ currentChat }) {
    let requirements = {
        confirmation: false,
        sendCommand: true
    }

    if(!currentChat) {
        return requirements;
    }

    if(!currentChat.get('isFinished')) {
        requirements.confirmation = true;
    }

    return requirements;
}

export { handleSaveConversationLS, getConversationLS, moveGuestToUserConversation, getDataRecovery, requirementsForNewChat, removeConversationByUidLS }