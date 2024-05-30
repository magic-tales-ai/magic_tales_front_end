import React, { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Profile from "./Profile";

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { setActiveChat, setActiveTab, setCurrentProfileId } from "../../redux/actions";

// Icons
import iconFile from "../../assets/images/icons/file-plus.svg";

// Hooks
import useSendMessage from '../../hooks/websocket/sendMessage';

// Constants
import { websocket_commands_messages } from "../../redux/websocket/constants";

export const ModalProfile = (props) => {
    const {
        isOpen,
        setOpen,
        profile
    } = props;
    const { sendMessage } = useSendMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toggle = () => {
        setOpen(!isOpen)
    }

    const goToNewTale = () => {
        sendMessage({ 
            command: websocket_commands_messages.NEW_TALE,
            profile_id: profile.get('id')
        })
        navigate('/dashboard')
    }

    const goToEditProfile = () => {
        dispatch(setCurrentProfileId(profile.get('id')))
        dispatch(setActiveTab('edit-profile'))
        navigate('/dashboard')
    }

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'modal-title text-center w-100 opacity-75' }}>
                {t('Reader Profile')}
            </ModalHeader>

            <ModalBody className="modal-profile">
                <div className="d-flex justify-content-center text-center"><Profile profile={profile} enableModal={false} extendedDetails={true} /></div>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" className="d-flex flex-fill justify-content-lg-center align-items-center py-1 w-100 w-lg-auto" onClick={goToNewTale}>
                    <span className="custom-icon me-2 font-size-24"><img src={iconFile} alt="icon file"/></span>
                    {t('New Tale')}
                </Button>
                <Button color="primary" className="d-flex flex-fill justify-content-lg-center align-items-center py-1 w-100 w-lg-auto" onClick={goToEditProfile}>
                    <i className="ri-pencil-line me-2 fw-normal font-size-24"></i>
                    {t('Edit Profile')}
                </Button>
            </ModalFooter>
        </Modal >
    )
}