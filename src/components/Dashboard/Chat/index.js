import React, { useEffect, useRef, useState } from 'react';
import { Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import SimpleBar from "simplebar-react";

// Marker
import DOMPurify from 'dompurify';
import { marked } from 'marked';

// Router
import withRouter from "../../../components/withRouter";

// Components
import ChatHead from "./Head";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

// Actions
import { setActiveChat, openModalSignin, closeModalSignin, newUserMessage, createUserTryMode } from "../../../redux/actions";

// Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

// i18n
import { useTranslation } from 'react-i18next';

// Icons
import iconFile from "../../../assets/images/icons/file-plus.svg";
import iconProgress from "../../../assets/images/icons/progress.svg";

// Progress circle bar
import 'react-circular-progressbar/dist/styles.css';

// Hooks
import useSendMessage from '../../../hooks/websocket/sendMessage';

// Helpers
import { getConversationLS } from '../../../redux/chats-list/helper';

// Selectors
import { selectChatsList } from '../../../redux/chats-list/selectors';
import { selectUser } from '../../../redux/user/selectors';
import { selectAuth } from '../../../redux/auth/selectors';

// Constants
import { websocket_commands_messages } from '../../../redux/websocket/constants';
import { selectModalSignIn } from '../../../redux/modal-signin/selectors';

function displayMessage(message) {
    const htmlContent = marked.parse(message);
    const htmlContentSanitizado = DOMPurify.sanitize(htmlContent);
    return { __html: htmlContentSanitizado };
}


function Chat({ activeChat, currentChat, sockets, user, tryModeToken, isOpenModalSignIn }) {
    const { t } = useTranslation();
    const { sendMessage } = useSendMessage();
    const dispatch = useDispatch();
    const simpleBarRef = useRef();

    const messages = currentChat?.get('messages');
    const statusMessages = messages?.filter(message => message.type === "status");
    const lastStatusMessage = statusMessages?.last();
    const lastStatusMessageIndex = messages?.indexOf(lastStatusMessage)

    const [showWorkingMessage, setShowWorkingMessage] = useState(false);
    const [preventChatLoading, setPreventChatLoading] = useState(false);

    useEffect(() => {
        if (isOpenModalSignIn) {
            dispatch(setActiveChat(null));
            setPreventChatLoading(true);
        }
        return () => {
            setPreventChatLoading(false);
            dispatch(closeModalSignin());
        }
    }, [])

    useEffect(() => {
        if (!user?.get('id') && !tryModeToken) {
            dispatch(createUserTryMode());
        }
    }, [])

    useEffect(() => {
        if (!isOpenModalSignIn) {
            setPreventChatLoading(false);
        }
    }, [isOpenModalSignIn])

    useEffect(() => {
        if (showWorkingMessage) {
            scrolltoBottom();
        }
    }, [showWorkingMessage])

    useEffect(() => {
        if (!currentChat) {
            setShowWorkingMessage(false);
            return;
        }

        if (!currentChat?.get('aiIsWorking')) {
            setShowWorkingMessage(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            setShowWorkingMessage(true);
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [, currentChat]);

    useEffect(() => {
        if (preventChatLoading || !(user || tryModeToken)) {
            return;
        }

        const dataConversationLS = getConversationLS();
        const hasConversationLS = dataConversationLS && dataConversationLS.uid;

        if (hasConversationLS && dataConversationLS.uid === activeChat) {
            return;
        }

        const messageParams = hasConversationLS
            ? {
                command: websocket_commands_messages.CONVERSATION_RECOVERY,
                uid: dataConversationLS.uid,
                needValidate: false,
            }
            : {
                command: websocket_commands_messages.NEW_TALE,
                needValidate: false,
            };

        sendMessage(messageParams);
    }, [sockets, user?.get('id'), tryModeToken, preventChatLoading])

    useEffect(() => {
        simpleBarRef.current?.recalculate();
        scrolltoBottom();

        if (currentChat && currentChat.get('isFinished') && !user?.get('id')) {
            dispatch(openModalSignin());
        }
    }, [currentChat])

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
        sendMessage({
            command: websocket_commands_messages.USER_MESSAGE,
            user_id: user?.get('id'),
            message: message
        })
    }

    const scrolltoBottom = () => {
        if (simpleBarRef.current?.el) {
            simpleBarRef.current.getScrollElement().scrollTop = simpleBarRef.current.getScrollElement().scrollHeight;
        }
    }

    return (
        <React.Fragment>
            <div className="user-chat w-100 vh-100 overflow-hidden user-chat-show">

                <div className="w-100 h-100 d-flex flex-column overflow-hidden position-relative">

                    <ChatHead />

                    <div className="chat-content">

                        {currentChat && <SimpleBar
                            style={{ maxHeight: "100%" }}
                            ref={simpleBarRef}
                            className={`chat-conversation ms-lg-5 p-3 pb-0 p-lg-4 ${currentChat?.get('isFinished') ? 'isFinish' : ''}`}
                            id="messages">
                            <ul className="list-unstyled mb-0 me-lg-5">
                                {
                                    currentChat?.get('messages')?.map((chat, key) =>
                                        <li key={key} className={chat.type === "sender" ? "right" : ""}>
                                            <div className="conversation-list">
                                                <div className="user-chat-content">
                                                    {
                                                        chat.message && chat.type !== 'system' && chat.type !== 'status' &&
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content" dangerouslySetInnerHTML={displayMessage(chat.message)}></div>
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
                                                                    {key === lastStatusMessageIndex &&
                                                                        <span className="animate-typing">
                                                                            <span className="dot ms-1"></span>
                                                                            <span className="dot ms-1"></span>
                                                                            <span className="dot ms-1"></span>
                                                                        </span>
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        chat.type === 'system' && chat?.message &&
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

                                {currentChat && showWorkingMessage && <li className="sender">
                                    <div className="conversation-list">
                                        <div className="user-chat-content">
                                            <div className="ctext-wrap">
                                                <div className="ctext-wrap-content">
                                                    <span className="animate-typing">
                                                        <span className="dot"></span>
                                                        <span className="dot ms-1"></span>
                                                        <span className="dot ms-1"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>}
                            </ul>
                        </SimpleBar>}

                        <div className="circular-progress d-none d-lg-block">
                            {currentChat?.showProgressBar && !currentChat?.isFinished &&
                                <>
                                    <CircularProgressbarWithChildren
                                        value={currentChat.progress}
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

                    {currentChat?.loginRequired && !user?.get('id') ? (
                        <div className="d-lg-flex justify-content-center p-lg-4 p-3 mt-auto">
                            <Button color="primary" className="d-flex mx-lg-1 w-100 w-lg-auto mb-2 mb-lg-0" onClick={() => { dispatch(openModalSignin()) }}>
                                <span className="flex-fill pe-sm-0 pe-md-4 pe-lg-0">{t('Login')}</span>
                            </Button>
                            <Button color="primary" className="d-flex mx-lg-1 w-100 w-lg-auto mb-2 mb-lg-0" onClick={() => { dispatch(openModalSignin({ view: 'register' })) }}>
                                <span className="flex-fill pe-sm-0 pe-md-4 pe-lg-0 ">{t('Sign up')}</span>
                            </Button>
                        </div>
                    ) : currentChat?.isFinished ? (
                        <div className="d-lg-flex justify-content-center p-lg-4 p-3 mt-auto">
                            <Button color="primary" className="d-flex mx-lg-1 w-100 w-lg-auto mb-2 mb-lg-0" onClick={() => { sendMessage({ command: websocket_commands_messages.SPIN_OFF, story_id: currentChat.get('storyId') }) }}>
                                <span className="custom-icon me-3"><img src={iconFile} alt="icon file" /></span>
                                <span className="flex-fill pe-4 pe-lg-0">{t('Create spin - off')}</span>
                            </Button>
                            <Button color="primary" className="d-flex mx-lg-1 w-100 w-lg-auto mb-2 mb-lg-0" onClick={() => { sendMessage({ command: websocket_commands_messages.NEW_TALE }) }}>
                                <span className="custom-icon me-3"><img src={iconFile} alt="icon file" /></span>
                                <span className="flex-fill pe-4 pe-lg-0">{t('New Tale')}</span>
                            </Button>
                            <Link to="/subscription/plans" className="btn btn-primary mx-lg-1 w-100 w-lg-auto">
                                <span className="flex-fill pe-4 pe-lg-0">{t('Upgrade Subscription')}</span>
                            </Link>
                        </div>
                    ) : currentChat ? (
                        <ChatInput onaddMessage={addMessage} disabled={currentChat.get('aiIsWorking')} />
                    ) : null}

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { isOpen } = selectModalSignIn(state);
    const { activeChat, currentChat } = selectChatsList(state);
    const sockets = state.Websocket?.sockets
    const { user } = selectUser(state);
    const { tryModeToken } = selectAuth(state);
    return { activeChat, currentChat, sockets, user, tryModeToken, isOpenModalSignIn: isOpen };
};

export default withRouter(connect(mapStateToProps, { setActiveChat, newUserMessage, closeModalSignin })(Chat));

