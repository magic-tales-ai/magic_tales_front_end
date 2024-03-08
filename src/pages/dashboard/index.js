import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

// Import Components
import ChatLeftSidebar from "./ChatLeftSidebar/ChatLeftSidebar";
import TaleChat from "./TaleChat/index";

// Import Modals
import { ModalConfirmChangeChat } from '../../components/Modals/ModalConfirmChangeChat';

// Import Actions
import { loadStoriesList } from '../../redux/actions';

const Index = ({ tales, stories, currentTaleDone, isUserLogged }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if(isUserLogged) {
            dispatch(loadStoriesList());
        }
    }, [isUserLogged, currentTaleDone])

    return (
        <React.Fragment>
            {/* chat left sidebar */}
            <ChatLeftSidebar recentChatList={stories} />
            
            {/* tale chat */}
            <TaleChat recentChatList={tales} />

            {/* confirm change chat */}
            <ModalConfirmChangeChat />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const stories = state.StoriesList.list;
    const tales = state.Chat.get('tales');
    const activeTale = state.Chat.get('active_tale');
    const currentTaleDone = !!tales.get(activeTale)?.get('isFinished')
    const isUserLogged = !!state.Auth.user?.token
    return { stories, tales, isUserLogged, currentTaleDone };
};

export default connect(mapStateToProps)(Index);