import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button, Collapse } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Simplebar
import SimpleBar from "simplebar-react";

// Actions
import { setActiveChat, deleteStory, openModalSignin } from "../../../redux/actions";

// i18n
import { useTranslation } from 'react-i18next';

// Icons
import iconFile from "../../../assets/images/icons/file-plus.svg";
import iconGroup from "../../../assets/images/icons/group.svg";
import iconLibrary from "../../../assets/images/icons/library.svg";

// Hooks
import useSendMessage from '../../../hooks/websocket/sendMessage';

// Components
import { ModalConfirmDelete } from '../../Common/Modals/ModalConfirmDelete';

// Selectors
import { selectUser } from "../../../redux/user/selectors";
import { selectChatsList } from '../../../redux/chats-list/selectors';
import { selectProfiles } from '../../../redux/profiles-list/selectors';
import { selectStories } from '../../../redux/stories-list/selectors';

// Constants
import { websocket_commands_messages } from '../../../redux/websocket/constants';
import { ModalStory } from '../../Library/ModalStory';

const Stories = ({ stories, activeChat, chats, currentChat, user, anyProfile, anyStory } = {}) => {
    const { sendMessage, validateForNewChat } = useSendMessage();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const ref = useRef();

    const [dropdownOpen, setdropdownOpen] = useState();
    const [openModalStory, setOpenModalStory] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [currentStoryId, setCurrentStoryId] = useState();
    const [disabledProfiles, setDisabledProfiles] = useState(false);
    const [disabledLibrery, setDisabledLibrery] = useState(false);

    const toggle = (e, id = false) => {
        e.preventDefault();
        e.stopPropagation();

        if (id === dropdownOpen) {
            setdropdownOpen(false);
            return;
        }
        setdropdownOpen(id);
    }

    const closeMenu = () => {
        var storyChat = document.getElementsByClassName("main-menu");
        if (storyChat) {
            storyChat[0]?.classList.remove("main-menu-show");
        }
    }

    useEffect(() => {
        ref.current.recalculate();
    }, [activeChat, stories]);

    useEffect(() => {
        if (user?.get('id') && !anyProfile) {
            setDisabledProfiles(true);
            return;
        }
        setDisabledProfiles(false);
    }, [user, anyProfile]);

    useEffect(() => {
        if (user?.get('id') && !anyStory) {
            setDisabledLibrery(true);
            return;
        }
        setDisabledLibrery(false);
    }, [user, anyStory]);

    const openStoryChat = (e, story) => {
        e.preventDefault();

        setCurrentStoryId(story.get('id'));
        setOpenModalStory(true);
        // if(chats.get(story.get('sessionId'))) { // chat already loaded
        //     validateForNewChat({ _callback: () => {
        //         dispatch(setActiveChat(story.get('sessionId')))
        //     }})
        // }
        // else {
        //     sendMessage({
        //         command: 'conversation_recovery', 
        //         uid: story.get('sessionId')
        //     })
        // }

        closeMenu();
    }

    return (
        <React.Fragment>
            <div className="d-flex align-items-center border-bottom d-lg-none">
                <Link to="#" onClick={closeMenu} className="text-dark font-size-24 p-2">
                    <i className="mdi mdi-close"></i>
                </Link>

                <h1 className="mb-0 flex-fill text-center font-size-14 pe-5"> Magic Tale </h1>
            </div>

            <div className="d-flex p-3">
                <Button color="primary" className="d-flex flex-fill" disabled={currentChat && currentChat.get('aiIsWorking')} onClick={() => { sendMessage({ command: websocket_commands_messages.NEW_TALE }) }}>
                    <span className="custom-icon me-3"><img src={iconFile} alt="icon file" /></span>
                    {t('New Tale')}
                </Button>

                <Link to='/profiles' onClick={(e) => { !user?.get('id') && dispatch(openModalSignin()) && e.preventDefault() }} size="xs" className={`btn btn-outline-primary mx-2 ${disabledProfiles && 'disabled'}`} >
                    <span className="custom-icon"><img src={iconGroup} alt="icon group" /></span>
                </Link>

                <Link to='/library' onClick={(e) => { !user?.get('id') && dispatch(openModalSignin()) && e.preventDefault() }} size="xs" className={`btn btn-outline-primary ${disabledLibrery && 'disabled'}`} >
                    <span className="custom-icon"><img src={iconLibrary} alt="icon library" /></span>
                </Link>
            </div>

            <SimpleBar className="chat-message-list" ref={ref}>
                <ul className="list-unstyled chat-list chat-user-list px-3" id="chat-list">
                    {
                        stories?.list?.size > 0 && stories.list.map((story) => {console.info(story)
                            return (
                                <li key={story.get('id')} id={"conversation" + story.get('id')} className={story.get('sessionId') == activeChat ? "active" : ""}>
                                    <Link to="#" onClick={(e) => openStoryChat(e, story)}>
                                        <div className="d-flex align-items-center">
                                            <div className={"chat-user-img align-self-center me-1 ms-0"}>
                                                <div className="avatar-xs">
                                                    <picture>
                                                        {story.get('image') 
                                                            ? <img src={'data:image/*;base64,' + story.get('image')} className="rounded avatar-xs" alt={story.get('title')} />
                                                            : <img src={'data:image/svg+xml;base64,' + story.get('defaultImage')} className="rounded avatar-xs" alt={story.get('title')} />
                                                        }
                                                    </picture>
                                                </div>
                                            </div>

                                            <div className="flex-grow-1 overflow-hidden">
                                                <h5 className="text-truncate font-size-14 mb-1 ms-1">{story.get('title')}</h5>
                                                <div className="d-flex">

                                                    {story.get('profileId')
                                                        ?
                                                        <>
                                                            <div className="chat-user-emoji avatar-xxs me-2 d-flex align-items-center justify-content-center">
                                                                <picture className="ms-2">
                                                                    {story.get('profile').get('image') &&
                                                                        <img src={'data:image/*;base64,' + story.get('profile').get('image')} className="rounded avatar-xxs" />
                                                                    }
                                                                </picture>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 fw-medium chat-user-message text-truncate">{story.get('profile').get('name')} &#x2022; <span className="opacity-75">{story.get('profile').get('age') + ' ' + t('years')}</span></p>
                                                            </div>
                                                        </>
                                                        :
                                                        <div>
                                                            <p className="mb-0 fw-medium chat-user-message text-truncate ms-1">{t('No reader')}</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="flex-lg-column">
                                                <Dropdown isOpen={dropdownOpen === story.get('id')} toggle={(e) => toggle(e, story.get('id'))}>
                                                    <DropdownToggle
                                                        tag="a"
                                                        className="font-size-24 p-0 border-0 text-muted dropdown-toggle bg-transparent"
                                                    >
                                                        <i className="ri-more-2-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-end">
                                                        <DropdownItem onClick={() => { sendMessage({ command: websocket_commands_messages.SPIN_OFF, story_id: story.get('id') }) }}>{t("Create spin - off")}</DropdownItem>
                                                        <DropdownItem divider className="my-1" />
                                                        <DropdownItem onClick={() => { setCurrentStoryId(story.get('id')); setOpenModalDelete(true) }} className="text-danger">{t("Delete")}</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                </ul>
                {/* <div className="px-3 text-center">
                    <Button color="link" size="sm" className="border-0 my-2 text-body mx-auto">View all</Button>
                </div> */}
            </SimpleBar>

            {currentStoryId && <ModalStory isOpen={openModalStory} setOpen={setOpenModalStory} story={stories.list.find(story => story?.get('id') == currentStoryId)} />}

            <ModalConfirmDelete isOpen={openModalDelete} setOpen={setOpenModalDelete} callback={() => { dispatch(deleteStory(currentStoryId)) }} title={'Are you sure you want to delete?'} >
                <p className='text-left'>You will not be able to recover this story</p>
            </ModalConfirmDelete>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { user } = selectUser(state);
    const { activeChat, chats, currentChat } = selectChatsList(state);
    const profiles = selectProfiles(state);
    const anyProfile = profiles.list.size > 0;
    const stories = selectStories(state);
    const anyStory = stories.list.size > 0;

    return { activeChat, chats, currentChat, user, anyProfile, stories, anyStory };
};

export default connect(mapStateToProps, { setActiveChat })(Stories);