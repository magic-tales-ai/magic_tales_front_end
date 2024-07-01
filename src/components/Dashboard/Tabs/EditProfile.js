import React, { useEffect, useRef } from 'react';
import { Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";

// Actions
import { setActiveTab, setActiveChat, setCurrentProfileId } from "../../../redux/actions";

// i18n
import { useTranslation } from 'react-i18next';

// Hooks
import useSendMessage from '../../../hooks/websocket/sendMessage';

// Constants
import { websocket_commands_messages } from '../../../redux/websocket/constants';

// Selectors
import { selectProfiles } from '../../../redux/profiles-list/selectors';
import { selectChatsList } from '../../../redux/chats-list/selectors';

const EditProfile = ({ profile, activeChat }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { sendMessage } = useSendMessage();
    const chatLoadedRef = useRef(false);
    const prevouseChatUid = useRef(null);

    useEffect(() => {
        if(!profile || chatLoadedRef.current) {
            return;
        }
        chatLoadedRef.current = true;
        prevouseChatUid.current = activeChat;

        dispatch(setActiveChat(null));
        sendMessage({ 
            command: websocket_commands_messages.UPDATE_PROFILE, 
            profile_id: profile.get('id'),
            needValidate: false 
        });
    }, [profile, activeChat, dispatch, sendMessage])

    const goToChat = () => {
        dispatch(setActiveChat(prevouseChatUid.current));
        dispatch(setActiveTab('chat'));
    }

    return !profile ?
        null
        : (
        <React.Fragment>
            <div className="d-flex p-3 align-items-center">
                <Button color="outline-primary" className="me-3 p-1" onClick={goToChat}>
                    <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                </Button>
                <h1 className="mb-0 ff-special font-size-24 fw-bold">{t('Reader editor')}</h1>
            </div>

            <div className="p-3">
                <div className="border-light border rounded-3 p-3">
                    <div className="avatar-md mb-3">
                        <picture>
                            <img src={'data:image/*;base64,' + profile.get('image')} className="rounded avatar-md" alt="profile avatar" />
                        </picture>
                    </div>

                    <div className="mb-3">
                        <h6 className="mb-2"> {profile.get('name')} </h6>
                        <p className="opacity-75 font-size-12"> {profile.get('age') + ' ' + t('years')} </p>
                    </div>

                    <p className="opacity-75 font-size-12">
                        {profile.get('details')}
                    </p>

                </div>
            </div>

        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const { currentProfile } = selectProfiles(state);
    const { activeChat } = selectChatsList(state);

    return { profile: currentProfile, activeChat };
};

export default connect(mapStatetoProps, { setActiveTab, setCurrentProfileId })(EditProfile);