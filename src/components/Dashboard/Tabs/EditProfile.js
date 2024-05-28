import React, { useEffect, useRef } from 'react';
import { Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";

// Actions
import { setActiveTab, setActiveChat, setCurrentProfileId } from "../../../redux/actions";

// i18n
import { useTranslation } from 'react-i18next';

// Image default
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

// Hooks
import useSendMessage from '../../../hooks/websocket/sendMessage';

// Constants
import { websocket_commands_messages } from '../../../redux/websocket/constants';

// Selectors
import { selectProfiles } from '../../../redux/profiles-list/selectors';

const EditProfile = ({ profile }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { sendMessage } = useSendMessage();
    const chatLoadedRef = useRef(false)

    useEffect(() => {
        console.log('asd')
    }, [])

    useEffect(() => {
        if(!profile || chatLoadedRef.current) {
            return;
        }
        chatLoadedRef.current = true;

        setActiveChat(null);
        sendMessage({ 
            command: websocket_commands_messages.UPDATE_PROFILE, 
            profile_id: profile.get('id'),
            needValidate: false 
        });

        return () => {
            dispatch(setActiveChat(null));
        }
    }, [profile])

    const goToChat = () => {
        dispatch(setActiveTab('chat'));
    }

    return (
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
                            <source srcSet={profile?.image} className="rounded avatar-md" />
                            <img src={avatar1} className="rounded avatar-md" alt="chatvia" />
                        </picture>
                    </div>

                    <div className="mb-3">
                        <h6 className="mb-2"> {profile?.name} </h6>
                        <p className="opacity-75 font-size-12"> {profile?.years + ' ' + t('years')} </p>
                    </div>

                    <ul className="opacity-75 font-size-12 ps-3">
                        {
                            profile?.characteristics?.map((characteristic, key) =>
                                <li key={key} id={"characteristic" + key} >
                                    {characteristic}
                                </li>
                            )
                        }
                    </ul>

                </div>
            </div>

        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const { currentProfile } = selectProfiles(state);

    return { profile: currentProfile };
};

export default connect(mapStatetoProps, { setActiveTab, setCurrentProfileId })(EditProfile);