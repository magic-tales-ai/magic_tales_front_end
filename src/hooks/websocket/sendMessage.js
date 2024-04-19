import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Actions
import { sendMessage as sendMessageAction, websocketConnect, setActiveChat } from '../../redux/actions';
import { openModalConfirmChangeChat } from '../../redux/modal-confirm-change-chat/actions';

// Helpers
import { requirementsForNewChat } from '../../redux/chats-list/helper';

// Selectors
import { selectUser } from '../../redux/user/selectors';
import { selectChatsList } from '../../redux/chats-list/selectors';

// Constants
import { websocket_commands_messages } from '../../redux/websocket/constants';

const useSendMessage = () => {
    const dispatch = useDispatch();
    const commandForNewChat = useRef([
        websocket_commands_messages.NEW_TALE, 
        websocket_commands_messages.SPIN_OFF, 
        websocket_commands_messages.CONVERSATION_RECOVERY
    ])
    const currentSocketUid = useRef(null)
    const { user } = useSelector(selectUser);
    const websocket = useSelector(state => state.Websocket);
    const { activeChat, currentChat, chats } = useSelector(selectChatsList);

    useEffect(() => {
        if (activeChat !== null) {
            currentSocketUid.current = activeChat
        }
    }, [activeChat])

    const createWSConection = async ({ params }) => {
        await new Promise((resolve) => {
            dispatch(websocketConnect(params, ({ uid }) => {
                dispatch(setActiveChat(uid));
                currentSocketUid.current = uid;
                resolve();
            }));
        });
    }

    const buildWsMessage = (message) => {
        let wsmessage = {
            ...message,
            try_mode: !user?.get('token')
        };

        if (user?.get('token')) {
            wsmessage.token = user.get('token').replace('Bearer ', '');
            wsmessage.user_id = user.get('id')
        }

        return wsmessage;
    };

    const sendMessage = async (message) => {
        var wsmessage = buildWsMessage(message);

        if (commandForNewChat.current.includes(wsmessage.command) && currentSocketUid.current) {
            validateForNewChat({
                _callback: (requirements) => {
                    if (requirements.sendCommand) {
                        handleSendMessage({
                            wsmessage
                        })
                    }
                }
            })
            return
        }

        handleSendMessage({ wsmessage });
    };

    const validateForNewChat = ({ _callback }) => {
        const requirements = requirementsForNewChat({ currentChat })

        if (requirements.confirmation) {
            dispatch(openModalConfirmChangeChat({
                callback: () => _callback(requirements)
            }))
            return;
        }

        _callback(requirements);
    }

    const handleSendMessage = async ({ wsmessage }) => {
        const needNewSocket = !currentSocketUid.current || commandForNewChat.current.includes(wsmessage.command);
        const currentSocket = (currentSocketUid.current && websocket) ? websocket.get(currentSocketUid.current) : null
        const needReconnect = currentSocket && currentSocket.CLOSED === currentSocket.readyState;

        if(needReconnect) {
            let params = { uid: currentSocketUid.current };
            await createWSConection({ params });
        }
        else if (needNewSocket) {
            const validUidForNewSocket = wsmessage.uid && !chats.get(wsmessage.uid);
            let params = {};

            if (validUidForNewSocket) {
                params.uid = wsmessage.uid
            }

            await createWSConection({ params });
        }

        dispatch(sendMessageAction({ uid: currentSocketUid.current, message: wsmessage }));
    }

    return { sendMessage, createWSConection, validateForNewChat };
};

export default useSendMessage;