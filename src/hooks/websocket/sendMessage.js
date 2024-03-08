import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

// Actions
import { sendMessage as sendMessageAction, websocketConnect, activeTale } from '../../redux/actions';
import { openModal } from '../../redux/modal-confirm/actions';

// Helpers
import { getDataRecovery, requirementsForNewChat } from '../../redux/chat/helper';



const useSendMessage = () => {
    const commandForNewChat = useRef(['new-tale', 'spin-off'])
    const dispatch = useDispatch();
    const user = useSelector(state => state.Auth?.user);
    const active_tale = useSelector(state => state.Chat?.get('active_tale'));
    const currentTale = useSelector(state => state.Chat?.get('tales')?.get(active_tale));
    const currentSocketUid = useRef(null)

    useEffect(() => {
        if (active_tale !== null) {
            currentSocketUid.current = active_tale
        }
    }, [active_tale])

    const createWSConection = async ({ params, updateActiveTale }) => {
        await new Promise((resolve) => {
            dispatch(websocketConnect(params, ({ uid }) => {
                if (updateActiveTale) {
                    dispatch(activeTale(uid));
                }

                currentSocketUid.current = uid;
                resolve();
            }));
        });
    }

    const buildWsMessage = (message) => {
        let wsmessage = {
            ...message,
            try_mode: !user?.token
        };

        if (user?.token) {
            wsmessage.token = user.token.replace('Bearer ', '');
            wsmessage.user_id = user.id
        }

        return wsmessage;
    };

    const sendMessage = async (message, updateActiveTale = true) => {
        var wsmessage = buildWsMessage(message);
        var dataRecovery = null;
        var requirements = null;

        if (commandForNewChat.current.includes(message.command)) {
            if (!active_tale) {
                //recovery
                dataRecovery = getDataRecovery()
                if (dataRecovery?.uid) {
                    wsmessage = buildWsMessage({
                        ...message,
                        command: 'conversation-recovery',
                    });
                }
            }
            else {
                //requirements before new chat
                requirements = requirementsForNewChat({ currentTale, storyParentId: message.story_id })
                if (requirements.confirmation) {
                    dispatch(openModal({
                        title: 'Are you sure?',
                        message: 'If you start a new conversation you will lose the current one',
                        callback: () => handleSendMessage({
                            wsmessage, dataRecovery, requirements, updateActiveTale
                        })
                    }))
                    return;
                }
            }
        }

        handleSendMessage({ wsmessage, dataRecovery, requirements, updateActiveTale })
    };

    const handleSendMessage = async ({ wsmessage, dataRecovery, requirements, updateActiveTale }) => {
        if (!requirements || requirements.sendCommand) {
            if (!currentSocketUid.current || commandForNewChat.current.includes(wsmessage.command)) {
                let params = {};

                if (dataRecovery?.uid) {
                    params.uid = dataRecovery.uid
                }

                await createWSConection({ params, updateActiveTale });
            }

            dispatch(sendMessageAction({ uid: currentSocketUid.current, message: wsmessage }));
        }
    }

    return { sendMessage };
};

export default useSendMessage;