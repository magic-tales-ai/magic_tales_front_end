import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

// Components
import Stories from "../Tabs/Stories";
import EditProfile from "../Tabs/EditProfile";
import { SidebarFooter } from './SidebarFooter';

import { useIsVisible } from '../../../hooks/useIsVisible';

const ChatLeftSidebar = (props) => {
    const dLgRef = useRef();
    const dLgIsVisible = useIsVisible(dLgRef);

    const tabContentRef = useRef(null);
    const { activeTab } = props;
    const hideSidebarFooter = activeTab === 'edit-profile';

    useEffect(() => {
        const handleDocumentClick = (event) => {
          if (!dLgIsVisible && tabContentRef.current && !tabContentRef.current.contains(event.target)) {
                tabContentRef.current.classList.remove("main-menu-show");
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
    
        return () => {
          document.removeEventListener('mousedown', handleDocumentClick);
        };
      }, []);
      

    return (
        <React.Fragment>
            <div ref={dLgRef} className="d-none d-lg-flex"></div>
            
            <div ref={tabContentRef} className={`chat-leftsidebar border-end flex-column d-flex ${dLgIsVisible ? '' : 'main-menu'}`}>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="chat" id="pills-chat">
                        <Stories />
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
    const activeTab = state.Layout.get('activeTab');

    return { activeTab };
};

export default connect(mapStatetoProps, null)(ChatLeftSidebar);