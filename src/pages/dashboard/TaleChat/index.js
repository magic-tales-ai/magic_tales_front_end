import React, { useState, useEffect, useRef } from 'react';
import { Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { newUserMessage } from '../../../redux/actions';

import SimpleBar from "simplebar-react";

import withRouter from "../../../components/withRouter";

//Import Components
import TaleHead from "./TaleHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

//actions
import { activeTale } from "../../../redux/actions";

//Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

//i18n
import { useTranslation } from 'react-i18next';

//Icons
import iconFile from "../../../assets/images/icons/file-plus.svg";
import iconProgress from "../../../assets/images/icons/progress.svg";

// Progress circle bar
import 'react-circular-progressbar/dist/styles.css';

// Hooks
import useSendMessage from '../../../hooks/websocket/sendMessage';

// Helpers
import { getConversationLS, moveGuestToUserConversation } from '../../../redux/chat/helper';

function TaleChat({ active_tale, currentTale, sockets, user }) {
    const { sendMessage } = useSendMessage();
    const dispatch = useDispatch();
    const ref = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        ref.current.recalculate();
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }, [currentTale]);

    useEffect(() => {
        if(!active_tale) {
            if(!user?.loading) {
                sendMessage({ command: 'new-tale' })
            }
        }
    }, [sockets, user?.id, user?.loading])

    useEffect(() => {
        const dataConversationLS = getConversationLS();
        if(currentTale && user?.id && !dataConversationLS?.userId && currentTale.get('uid') === dataConversationLS?.uid) {
            sendMessage({ command: 'link-user-with-conversations', session_ids: [dataConversationLS?.uid] })
            moveGuestToUserConversation()
        }
    }, [currentTale, user])

    const addMessage = (message, type) => {
        var messageObj = null;

        switch (type) {
            case "textMessage":
                messageObj = {
                    message: message,
                    type: "sender",
                    image: avatar4,
                    isFileMessage: false,
                    isImageMessage: false
                }
                break;

            case "file":
                messageObj = {
                    message: 'file',
                    file: message.name,
                    type: "sender",
                    image: avatar4,
                    isFileMessage: true,
                    isImageMessage: false
                }
                break;

            case "imageMessage":
                var imageMessage = [
                    { image: message },
                ]

                messageObj = {
                    message: 'image',
                    imageMessage: imageMessage,
                    type: "sender",
                    image: avatar4,
                    isImageMessage: true,
                    isFileMessage: false
                }
                break;

            default:
                break;
        }

        dispatch(newUserMessage(messageObj))

        scrolltoBottom();

        sendMessage({
            command: 'user_message',
            user_id: user?.id,
            message: message
        })
    }

    function scrolltoBottom() {
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }


    return (
        <React.Fragment>
            <div className="user-chat w-100 vh-100 overflow-hidden user-chat-show">

                <div className="w-100 h-100 d-flex flex-column overflow-hidden position-relative">

                    <TaleHead />

                    <div className="chat-content">

                        <SimpleBar
                            style={{ maxHeight: "100%" }}
                            ref={ref}
                            className={`chat-conversation ms-lg-5 p-3 p-lg-4 ${currentTale?.isFinished ? 'isFinish' : ''}`}
                            id="messages">
                            <ul className="list-unstyled mb-0 me-lg-5">
                                {
                                    currentTale?.get('messages')?.map((chat, key) =>
                                        <li key={key} className={chat.type === "sender" ? "right" : ""}>
                                            <div className="conversation-list">
                                                <div className="user-chat-content">
                                                    {
                                                        chat.message && chat.type !== 'system' && chat.type !== 'status' &&
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                <p>{chat.message}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        chat.isImageMessage &&
                                                        // image list component
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content ctext-wrap-content-image">
                                                                <ImageList images={chat.images} />
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        chat.isFileMessage &&
                                                        //file input component
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content ctext-wrap-content-file">
                                                                <FileList files={chat.files} />
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        chat.type === 'status' &&
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                <p className="mb-0">
                                                                    {chat.message}
                                                                    <span className="animate-typing">
                                                                        <span className="dot ms-1"></span>
                                                                        <span className="dot ms-1"></span>
                                                                        <span className="dot ms-1"></span>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        chat.type === 'system' &&
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                <p className="mb-0 text-system" dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        chat.message.replace('{perc}', `<span className="text-danger">${chat?.progressUntilThisMessage}%</span>`)
                                                                        + 
                                                                        (chat.firstProgressUpdate && chat?.progressUntilThisMessage < 100
                                                                            ? `<br /> <-`
                                                                            : '')
                                                                }}>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </SimpleBar>

                        <div className="circular-progress d-none d-lg-block">
                            {currentTale?.showProgressBar && !currentTale?.isFinished &&
                                <>
                                    <CircularProgressbarWithChildren
                                        value={currentTale.progress}
                                        strokeWidth={6}
                                        styles={{
                                            trail: {
                                                // Trail color
                                                stroke: '#202539',
                                            },
                                            path: {
                                                stroke: `rgba(92, 113, 226, 1)`,
                                            },
                                            text: {
                                                // Text color
                                                fill: '#5C71E2',
                                                // Text size
                                                fontSize: '16px',
                                            }
                                        }}

                                    >
                                        <img style={{ width: 15 }} src={iconProgress} alt="doge" />
                                    </CircularProgressbarWithChildren>
                                </>
                            }
                        </div>
                    </div>

                    {currentTale?.isFinished
                        ? <div className="d-lg-flex justify-content-center p-lg-4 p-3 mt-auto">
                            <Button color="primary" className="d-flex mx-lg-1 w-100 w-lg-auto mb-2 mb-lg-0" onClick={() => { sendMessage({ command: 'spin-off', story_id: currentTale.get('storyId') }) }}>
                                <span className="custom-icon me-3"><img src={iconFile} alt="icon file" /></span>
                                <span className="flex-fill pe-4 pe-lg-0">{t('Create spin - off')}</span>
                            </Button>
                            <Button color="primary" className="d-flex mx-lg-1 w-100 w-lg-auto mb-2 mb-lg-0" onClick={() => { sendMessage({ command: 'new-tale' }) }}>
                                <span className="custom-icon me-3"><img src={iconFile} alt="icon file" /></span>
                                <span className="flex-fill pe-4 pe-lg-0">{t('New Tale')}</span>
                            </Button>
                            <Link to="/subscription/plans" className="btn btn-primary mx-lg-1 w-100 w-lg-auto">
                                <span className="flex-fill pe-4 pe-lg-0">{t('Upgrade Suscription')}</span>
                            </Link>
                        </div>
                        : <ChatInput onaddMessage={addMessage} />
                    }

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const active_tale = state.Chat.get('active_tale');
    const sockets = state.Websocket?.sockets
    const user = state.Auth?.user
    const currentTale = state.Chat.get('tales')?.get(active_tale);
    return { active_tale, currentTale, sockets, user };
};

export default withRouter(connect(mapStateToProps, { activeTale, newUserMessage })(TaleChat));

