import React, { useState, useRef } from 'react';
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { ModalConfirmDelete } from '../Common/Modals/ModalConfirmDelete';
import { ModalProfile } from './ModalProfile';

// Actions
import { setActiveChat, setActiveTab, uploadProfileImage, setCurrentProfileId } from '../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Hooks
import useSendMessage from '../../hooks/websocket/sendMessage';

// Constants
import { websocket_commands_messages } from '../../redux/websocket/constants';

// Modals
import { ModalUpdateImage } from '../Common/Modals/ModalUpdateImage';

const Profile = (props) => {
    const { profile, displayActions = true, small = false, enableModal = true, extendedDetails = false } = props;
    const { t } = useTranslation();
    const { sendMessage } = useSendMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openModalProfile, setOpenModalProfile] = useState(false);
    const [openModalUpdateImageProfile, setOpenModalUpdateImageProfile] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dropdownOpen, setdropdownOpen] = useState();

    const toggle = () => {
        setdropdownOpen(!dropdownOpen)
    }

    const goToNewTale = () => {
        sendMessage({ command: websocket_commands_messages.NEW_TALE })
        navigate('/dashboard')
    }

    const goToEditProfile = () => {
        dispatch(setCurrentProfileId(profile.get('id')))
        dispatch(setActiveTab('edit-profile'))
        navigate('/dashboard')
    }

    const updateImage = ({ image }) => {
        dispatch(uploadProfileImage({ profileId: profile.get('id'), image }))
    }

    const avatar = <picture>
        {profile.get('image') 
            && <img src={'data:image/*;base64,' + profile.get('image')} className={`rounded avatar-${small ? 'xs' : 'md'}`} alt="avatar" />
        }
    </picture>

    const profileInfo = <div className="profile-info">
        <h6 className="mb-0 profile-name"> {profile.get('name')} </h6>
        {profile.get('age') !== '' && <p className="profile-year mb-2 font-size-12"> {profile.get('age') + ' ' + t('years')} </p>}

        {!small && <p className={`font-size-12 details ${extendedDetails ? 'extended-details' : ''}`}>
            {profile.get('details')}
        </p>}
    </div>


    return (
        <React.Fragment>
            <div className="p-3 cursor-pointer" onClick={() => setOpenModalProfile(true) }>
                <div className="mb-2 d-flex justify-content-between profile-avatar">
                    <div className={`avatar-${small ? 'xs' : 'md'}`}>{avatar}</div>

                    {displayActions && <div className="d-inline-block" onClick={(e) => { e.stopPropagation(); }}>
                        <div className="flex-lg-column">
                            <Nav className="side-menu-nav d-block">
                                <Dropdown nav isOpen={dropdownOpen} toggle={toggle} className="nav-item d-block btn-group dropup profile-user-dropdown">
                                    <DropdownToggle tag="a" className="text-center">
                                        <i className="ri-more-2-fill font-size-20"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem onClick={() => goToNewTale() }> {t('New Tale')} </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => goToEditProfile() }> {t('Edit Profile')} </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={() => setOpenModalUpdateImageProfile(true) }> {t('Update Profile Image')} </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem href="" className="text-danger" > <div onClick={() => setOpenModalDelete(true)}> {t('Delete')} </div>  </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Nav>
                        </div>
                    </div>}
                </div>

                {profileInfo}

            </div>

            <ModalConfirmDelete isOpen={openModalDelete} setOpen={setOpenModalDelete} callback={() => { setOpenModalDelete(false) }} >
                <div> 
                    <p className="text-center">
                        {t('By deleting the reader profile, the stories will not be deleted')}
                    </p>

                    <div className="p-3 card-profile mx-auto border-light border rounded-3">
                        <div className="mb-2 d-flex justify-content-between profile-avatar">
                            <div className="avatar-md">{avatar}</div>
                        </div>
                        {profileInfo}
                    </div>
                </div>
            </ModalConfirmDelete>

            <ModalUpdateImage 
                isOpen={openModalUpdateImageProfile}
                setOpen={setOpenModalUpdateImageProfile}
                title={t("Update Profile Image")}
                image={profile?.get('image')}
                loading={profile?.get('loading')}
                update={updateImage}
                error={profile?.get('error')}
            />

            {enableModal && <ModalProfile isOpen={openModalProfile} setOpen={setOpenModalProfile} profile={profile} />}
        </React.Fragment>
    );
}

export default connect(null, { setActiveChat, setActiveTab, uploadProfileImage })(Profile);