import { getLoggedInUser } from "../../helpers/authUtils";

function handleSaveConversationLS({ uid, storyParentId = null }) {
    if (!uid) {
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
    var conversation = JSON.parse(localStorage.getItem('guestConversationData'));

    if(user && !conversation) {
        conversation = JSON.parse(localStorage.getItem(user.id + 'userConversationData'));
    }

    return conversation;
}

function moveGuestToUserConversation() {
    const user = getLoggedInUser();
    const guestConversation = JSON.parse(localStorage.getItem('guestConversationData'));
    
    if(user && guestConversation) {
        guestConversation.userId = user?.id;
        localStorage.setItem(user.id + 'userConversationData', JSON.stringify(guestConversation));
        localStorage.removeItem('guestConversationData');
    }
}

function getDataRecovery() {
    const conversation = getConversationLS();

    var dataRecovery = {
        canRecover: conversation ? true : false,
        uid: conversation?.uid ?? null,
    }
    console.log(dataRecovery)
    return dataRecovery;
}

function removeConversationByUid(uid) {
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

function requirementsForNewChat({ currentTale, storyParentId }) {console.log(currentTale, storyParentId)
    let requirements = {
        confirmation: false,
        sendCommand: true
    }

    if(!currentTale) {
        return requirements;
    }

    if(!currentTale.get('isFinished') && currentTale.get('hasUserMessages')) {
        requirements.confirmation = true;
    }

    if(storyParentId && currentTale.get('storyParentId') == storyParentId) {
        requirements.confirmation = false;
        requirements.sendCommand = false;
    }

    return requirements;
}

export { handleSaveConversationLS, getConversationLS, moveGuestToUserConversation, getDataRecovery, requirementsForNewChat, removeConversationByUid }