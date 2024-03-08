import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

//Import Components
import Chats from "../Tabs/Chats";
import EditProfile from "../Tabs/EditProfile";

import { SidebarFooter } from './SidebarFooter';

function ChatLeftSidebar(props) {
    const mobileTabRef = useRef(null);
    const activeTab = props.activeTab;
    const hideSidebarFooter = activeTab === 'edit-profile'

    useEffect(() => {
        const handleDocumentClick = (event) => {
          if (mobileTabRef.current && !mobileTabRef.current.contains(event.target)) {
                mobileTabRef.current.classList.remove("main-menu-show");
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
    
        return () => {
          document.removeEventListener('mousedown', handleDocumentClick);
        };
      }, []);
      

    return (
        <React.Fragment>
            <div className="chat-leftsidebar border-end flex-column d-none d-lg-flex">
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="chat" id="pills-chat">
                        <Chats recentChatList={props.recentChatList} />
                    </TabPane>
                    <TabPane tabId="edit-profile" id="pills-profile">
                        <EditProfile />
                    </TabPane>
                </TabContent>

                {!hideSidebarFooter && <SidebarFooter />}
            </div>
            
            <div ref={mobileTabRef} className="chat-leftsidebar border-end flex-column d-flex d-lg-none main-menu">
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="chat" id="pills-chat">
                        <Chats recentChatList={props.recentChatList} />
                    </TabPane>
                    <TabPane tabId="edit-profile" id="pills-profile">
                        <EditProfile />
                    </TabPane>
                </TabContent>

                {!hideSidebarFooter && <SidebarFooter />}
            </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, null)(ChatLeftSidebar);