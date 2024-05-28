import React, { useEffect } from 'react';
import { connect } from "react-redux";

// Components
import ChatLeftSidebar from "../components/Dashboard/ChatLeftSidebar";
import Chat from "../components/Dashboard/Chat/index";

// Modals
import { ModalConfirmChangeChat } from '../components/Dashboard/ModalConfirmChangeChat';

// Actions
import { loadStoriesList, loadProfilesList, loadPlansList, loadMonthStoriesCount } from '../redux/actions';

// Selectors
import { selectUser } from '../redux/user/selectors';
import { selectChatsList } from '../redux/chats-list/selectors';

const Dashboard = ({ currentChatDone, user, ...props }) => {

    useEffect(() => {
        if(user?.get('id')) {
            props.loadProfilesList();
            props.loadStoriesList();
            props.loadPlansList();
            props.loadMonthStoriesCount();
        }
    }, [user?.get('id')])

    useEffect(() => {
        if(user?.get('id') && currentChatDone) {
            props.loadProfilesList();
            props.loadStoriesList();
            props.loadPlansList();
            props.loadMonthStoriesCount();
        }
    }, [currentChatDone])

    return (
        <React.Fragment>
            {/* chat left sidebar */}
            <ChatLeftSidebar />
            
            {/* chat */}
            <Chat />

            {/* confirm change chat */}
            <ModalConfirmChangeChat />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { user } = selectUser(state);
    const { currentChat } = selectChatsList(state)
    const currentChatDone = currentChat?.get('isFinished')

    return { user, currentChatDone };
};

export default connect(mapStateToProps, { loadStoriesList, loadProfilesList, loadPlansList, loadMonthStoriesCount })(Dashboard);