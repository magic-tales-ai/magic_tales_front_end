import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, connect } from "react-redux";

// Components
import withRouter from "../../components/withRouter";
import { ModalDeleteStory } from "./ModalDeleteStory";

// i18n
import { useTranslation } from 'react-i18next';

// Image default
import avatar1 from "../../assets/images/users/user-avatar.png";

// Icon
import iconFile from "../../assets/images/icons/file-plus.svg";

// Hooks
import useSendMessage from '../../hooks/websocket/sendMessage';

// Selector
import { selectChatsList } from "../../redux/chats-list/selectors";

// Actions
import { setActiveChat, downloadStoryFile } from "../../redux/actions";

// Constants
import { websocket_commands_messages } from "../../redux/websocket/constants";

// Helper
import { displayText } from "../../helpers/app";

const ModalStoryComponent = (props) => {
    const dispatch = useDispatch();
    const { sendMessage, validateForNewChat } = useSendMessage();
    const { t } = useTranslation();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const {
        isOpen,
        setOpen,
        story,
        chats,
        router: { navigate }
    } = props;

    const toggle = () => {
        setOpen(!isOpen)
    }

    // const openChat = () => {
    //     if (chats.get(story.get('sessionId'))) { // chat already loaded
    //         validateForNewChat({
    //             _callback: () => {
    //                 dispatch(setActiveChat(story.get('sessionId')))
    //                 navigate('/dashboard');
    //             }
    //         })
    //     }
    //     else {
    //         sendMessage({
    //             command: 'conversation_recovery',
    //             uid: story.get('sessionId')
    //         })
    //         navigate('/dashboard');
    //     }
    // }

    const newSpinOff = () => {
        sendMessage({
            command: websocket_commands_messages.SPIN_OFF,
            story_id: story.get('id')
        })
        navigate('/dashboard');
        toggle();
    }

    const download = () => {
        dispatch(downloadStoryFile(story.get('id')))
    }

    if (!story) {
        return null;
    }

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} centered toggle={toggle} size="lg">
                <ModalHeader toggle={toggle} className="border-0 pb-0"></ModalHeader>
                <ModalBody className="pt-0">
                    <div className="d-lg-flex">
                        <div className="me-3">
                            <div className="mb-3 text-center text-lg-start">
                                <picture>
                                    {story.get('image')
                                        ? <img src={'data:image/*;base64,' + story.get('image')} className="rounded avatar-lg h-auto" alt={story.get('title')} />
                                        : <img src={'data:image/svg+xml;base64,' + story.get('defaultImage')} className="rounded avatar-lg h-auto" alt={story.get('title')} />
                                    }
                                </picture>
                            </div>
                            <div className="d-none d-lg-block">
                                <Button onClick={download} color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><i className="ri-download-2-line me-2 fw-normal font-size-20"></i>{t('Download')}</Button>
                                <Button onClick={newSpinOff} color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><span className="custom-icon me-2 font-size-20"><img src={iconFile} alt="icon file" /></span>{t('Create spin - off')}</Button>
                                <Button onClick={() => setOpenModalDelete(true)} color="outline-danger" className="d-flex align-items-center w-100 text-start font-size-16"><i className="ri-delete-bin-6-line me-2 fw-normal font-size-20"></i>{t('Delete')}</Button>
                            </div>
                        </div>
                        <div className="w-100">
                            <div id="title" className="mb-4">
                                <h6 className="fw-normal opacity-75 mb-3"> {t('Title Tale')} </h6>
                                <h5 className="border-light border py-2 px-3 rounded-3 ff-special fw-normal font-size-20"> {story.get('title')} </h5>
                            </div>

                            <div id="reader-profile" className="mb-4">
                                <h6 className="fw-normal opacity-75 mb-3"> {t('Reader Profile')} </h6>
                                <div className="d-flex align-items-center border-light border p-2 rounded-3">
                                    <div className="avatar-xs me-3">
                                        <picture>
                                            {story.get('profile').get('image')
                                                ? <img src={'data:image/*;base64,' + story.get('profile').get('image')} className="rounded img-fluid" />
                                                : <img src={avatar1} className="rounded img-fluid" alt="avatar" />
                                            }
                                        </picture>
                                    </div>
                                    <div>
                                        <p className="mb-0 text-body"> {story.get('profile').get('name')} </p>
                                        {story.get('profile').get('age') !== '' && <span> {story.get('profile').get('age') + ' ' + t('years')} </span>}
                                    </div>
                                </div>
                            </div>

                            <div id="tale-summary" className="mb-4">
                                <h6 className="fw-normal opacity-75 mb-3"> {t('Tale Summary')} </h6>
                                <div className="border-light border p-2 rounded-3">
                                    <p className="text-uppercase text-body mb-1">{t('Storyline')}</p>
                                    <p className="font-size-12" dangerouslySetInnerHTML={displayText(story.get('synopsis'))}></p>
                                </div>
                            </div>
                        </div>
                        <div className="d-lg-none">
                            <Button onClick={download} color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><i className="ri-download-2-line me-2 fw-normal font-size-20"></i>{t('Download')}</Button>
                            <Button onClick={newSpinOff} color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><span className="custom-icon me-2 font-size-20"><img src={iconFile} alt="icon file" /></span>{t('Create spin - off')}</Button>
                            <Button onClick={() => setOpenModalDelete(true)} color="outline-danger" className="d-flex align-items-center w-100 text-start font-size-16"><i className="ri-delete-bin-6-line me-2 fw-normal font-size-20"></i>{t('Delete')}</Button>
                        </div>
                    </div>

                </ModalBody>
            </Modal >

            <ModalDeleteStory isOpen={openModalDelete} setOpen={setOpenModalDelete} story={story} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { chats } = selectChatsList(state);

    return { chats };
};

export const ModalStory = withRouter(connect(mapStateToProps)(ModalStoryComponent));