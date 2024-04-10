import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

// Components
import ChatLeftSidebar from "../components/Dashboard/ChatLeftSidebar";
import Chat from "../components/Dashboard/Chat/index";

// Modals
import { ModalConfirmChangeChat } from '../components/Dashboard/ModalConfirmChangeChat';

// Actions
import { loadStoriesList, loadProfilesList } from '../redux/actions';

// Selectors
import { selectStories } from '../redux/stories-list/selectors';
import { selectAuth } from '../redux/auth/selectors';
import { selectChatsList } from '../redux/chats-list/selectors';

const Dashboard = ({ stories, currentChatDone, user }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if(user?.get('id')) {
            dispatch(loadProfilesList());
            dispatch(loadStoriesList());
        }
    }, [user, currentChatDone])

    return (
        <React.Fragment>
            {/* chat left sidebar */}
            <ChatLeftSidebar stories={stories.list} />
            
            {/* chat */}
            <Chat />

            {/* confirm change chat */}
            <ModalConfirmChangeChat />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const stories = selectStories(state);
    const { user } = selectAuth(state);
    const { currentChat }= selectChatsList(state)
    const currentChatDone = currentChat?.get('isFinished')

    return { stories, user, currentChatDone };
};

export default connect(mapStateToProps)(Dashboard);