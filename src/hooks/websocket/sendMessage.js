import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

// Actions
import { sendMessage as sendMessageAction, websocketConnect, setActiveChat } from '../../redux/actions';

// Helpers
import { requirementsForNewChat } from '../../redux/chats-list/helper';

// Selectors
import { selectUser } from '../../redux/user/selectors';
import { selectAuth } from '../../redux/auth/selectors';
import { selectChatsList } from '../../redux/chats-list/selectors';

// Constants
import { websocket_commands_messages } from '../../redux/websocket/constants';

// Hooks
import { useModal } from '../../contexts/DynamicModalContext';

const useSendMessage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const modalLimitStories = useModal();
    const modalConfirmChangeChat = useModal();

    const currentSocketUid = useRef(null)
    const { user } = useSelector(selectUser);
    const { tryModeToken, tryModeId } = useSelector(selectAuth);
    const websocket = useSelector(state => state.Websocket);
    const { activeChat, currentChat, chats } = useSelector(selectChatsList);
    const commandForNewChat = useRef([
        websocket_commands_messages.NEW_TALE, 
        websocket_commands_messages.SPIN_OFF, 
        websocket_commands_messages.CONVERSATION_RECOVERY,
        websocket_commands_messages.UPDATE_PROFILE
    ])
    const commandRequireCheckLimit = useRef([
        websocket_commands_messages.NEW_TALE, 
        websocket_commands_messages.SPIN_OFF
    ])

    useEffect(() => {
        currentSocketUid.current = activeChat;
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
        else if(tryModeToken) {
            wsmessage.token = tryModeToken;
            wsmessage.user_id = tryModeId
        }

        return wsmessage;
    };

    const sendMessage = async ({needValidate = true, ...message}) => {
        var wsmessage = buildWsMessage(message);
        const maxStoriesExceeded = user && user.get('monthStoriesCount') >= user.get('plan').get('storiesPerMonth');

        if(maxStoriesExceeded && commandRequireCheckLimit.current.includes(wsmessage.command)) {
            modalLimitStories.open({
                title: t('Limit of stories'),
                bodyContent: <p>{t('You have reached the monthly story limit for your plan.')}</p>,
                footerContent: <Link to="/subscription/plans" onClick={modalLimitStories.close} className="flex-fill btn btn-outline-primary">
                        <i className="ri-star-line me-2"></i>
                        {t('View Plans')}
                    </Link>
            });
            return
        }

        if (needValidate && commandForNewChat.current.includes(wsmessage.command) && currentSocketUid.current) {
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
        const requirements = requirementsForNewChat({ currentChat });

        if (requirements.confirmation) {
            const handleAccept = () => {
                modalConfirmChangeChat.close();
                _callback(requirements);
            }

            modalConfirmChangeChat.open({
                title: t('Are you sure?'),
                bodyContent: <p>{t('If you start a new conversation you will lose the current one')}</p>,
                footerContent: <React.Fragment>
                    <Button color="outline-danger" className="flex-fill w-100 w-lg-auto" onClick={handleAccept}>
                        {t('Accept')}
                    </Button>
                    <Button color="primary" className="flex-fill w-100 w-lg-auto" onClick={modalConfirmChangeChat.close}>
                        {t('Cancel')}
                    </Button>
                </React.Fragment>
            })
            return;
        }

        _callback(requirements);
    }

    const handleSendMessage = async ({ wsmessage }) => {
        const needNewSocket = !currentSocketUid.current || commandForNewChat.current.includes(wsmessage.command);
        const currentSocket = (currentSocketUid.current && websocket) ? websocket.get(currentSocketUid.current) : null
        const needReconnect = currentSocket && currentSocket.CLOSED === currentSocket.readyState;

        if(needReconnect) {
            console.log(currentSocketUid.current, currentSocket, needReconnect)
            let params = { uid: currentSocketUid.current };
            await createWSConection({ params });
        }
        else if (needNewSocket) {
            const validUidForNewSocket = wsmessage.uid && !chats.get(wsmessage.uid);
            let params = {};

            if (validUidForNewSocket) {
                params.uid = wsmessage.uid
            }

            if(currentSocket && wsmessage.command !== websocket_commands_messages.UPDATE_PROFILE) {
                currentSocket.close();
            }

            await createWSConection({ params });
        }

        dispatch(sendMessageAction({ uid: currentSocketUid.current, message: wsmessage }));
    }

    return { sendMessage, createWSConection, validateForNewChat };
};

export default useSendMessage;