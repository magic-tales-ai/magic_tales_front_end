import React, { useState } from 'react';
import { Card, CardBody, Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import SimpleBar from "simplebar-react";

// Components/Modals
import withRouter from '../withRouter';
import { ModalDeleteStory } from './ModalDeleteStory';
import { ModalStory } from './ModalStory';

// Actions
import { setActiveChat, downloadStoryFile } from '../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Images
import avatarDefault from "../../assets/images/users/user-avatar.png";

// Constants
import { websocket_commands_messages } from '../../redux/websocket/constants';

// Hooks
import useSendMessage from '../../hooks/websocket/sendMessage';

// Helpers
import { displayText } from '../../helpers/app';

const CardStory = ({ story, router: { navigate } }) => {
    const { t } = useTranslation();
    const { sendMessage } = useSendMessage();
    const dispatch = useDispatch();

    const [openModalStory, setOpenModalStory] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dropdownOpen, setdropdownOpen] = useState();

    const toggle = () => {
        setdropdownOpen(!dropdownOpen)
    }

    const newSpinOff = () => {
        sendMessage({
            command: websocket_commands_messages.SPIN_OFF,
            story_id: story.get('id')
        })
        navigate('/dashboard');
    }

    const download = () => {
        console.log('download')
        dispatch(downloadStoryFile(story.get('id')));
    }

    const profileInfo = <div className="d-flex">
        <div className="chat-user-emoji bg-primary rounded p-1 text-dark me-2 d-flex align-items-center justify-content-center">
            {story.get('profile').get('image')
                ? <img src={'data:image/*;base64,' + story.get('profile').get('image')} className="rounded avatar-xs" alt="Profile" />
                : <img src={avatarDefault} className="rounded avatar-xs" alt="avatar" />
            }
        </div>
        <div>
            <p className="mb-0 fw-bold font-size-12">{story.get('profile').get('name')}</p>
            <p className="mb-0 font-size-12 opacity-75">{story.get('profile').get('age') + ' ' + t('years')}</p>
        </div>
    </div>

    return (
        <React.Fragment>
            <Card color="secondary" className="card-library cursor-pointer" onClick={() => setOpenModalStory(true)} >
                <CardBody>
                    <div className="d-flex">
                        <picture>
                            {story.get('image')
                                ? <img src={'data:image/*;base64,' + story.get('image')} className="rounded avatar-md me-2 h-auto" alt={story.get('title')} />
                                : <img src={'data:image/svg+xml;base64,' + story.get('defaultImage')} className="rounded avatar-md me-2 h-auto" alt={story.get('title')} />
                            }
                        </picture>

                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="font-size-14 mb-0 opacity-75">{story.get('title')}</h2>
                                <div className="d-inline-block" onClick={(e) => { e.stopPropagation(); }}>
                                    <div className="flex-lg-column">
                                        <Nav className="side-menu-nav d-block">
                                            <Dropdown nav isOpen={dropdownOpen} toggle={toggle} className="nav-item d-block btn-group dropup profile-user-dropdown">
                                                <DropdownToggle tag="a" className="text-center">
                                                    <i className="ri-more-2-fill font-size-24"></i>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem onClick={newSpinOff}> {t('Create spin - off')} </DropdownItem>
                                                    <DropdownItem divider className="my-1" />
                                                    <DropdownItem onClick={download}> {t('Download')} </DropdownItem>
                                                    <DropdownItem divider className="my-1" />
                                                    <DropdownItem className="text-danger" > <div onClick={() => setOpenModalDelete(true)}> {t('Delete')} </div>  </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Nav>
                                    </div>
                                </div>
                            </div>

                            <SimpleBar className="story-card-synopsis">
                                <p className="font-size-10 opacity-75" dangerouslySetInnerHTML={displayText(story.get('synopsis'))}></p>
                            </SimpleBar>

                            {profileInfo}
                        </div>
                    </div>
                </CardBody>
            </Card>

            <ModalDeleteStory isOpen={openModalDelete} setOpen={setOpenModalDelete} story={story} />

            <ModalStory isOpen={openModalStory} setOpen={setOpenModalStory} story={story} setOpenModalDelete={setOpenModalDelete} />

        </React.Fragment>
    );
}

export default withRouter(connect(null, { setActiveChat })(CardStory));