import React, { useState, useEffect } from 'react';
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function UserHead(props) {
    const { activeTab } = props
    const [showMenu, setShowMenu] = useState(activeTab === 'chat')
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle(getTitle())
        setShowMenu(activeTab === 'chat')
    }, [activeTab])

    const closeTaleChat = (e) => {
        e.preventDefault();
        var taleChat = document.getElementsByClassName("main-menu");
        if (taleChat) {
            taleChat[0]?.classList.add("main-menu-show");
        }
    }

    const getTitle = () => {
        const { activeTab } = props
        let title = 'Magi Tale'

        if (!showMenu) {
            switch (activeTab) {
                case 'edit-profile':
                    title = 'Read editor';
                    break;
            }
        }

        return title;
    }

    return (
        <React.Fragment>
            <div className="p-lg-3 p-lg-4 border-bottom user-chat-topbar d-lg-none">
                <Row className="align-items-center">
                    <Col sm={4} xs={12}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none ms-0 w-100">
                                <div className="d-flex align-items-center">
                                    <Link to="#" onClick={(e) => closeTaleChat(e)} className="user-chat-remove text-dark font-size-24 px-3 p-2">
                                        {showMenu 
                                            ? <i className="mdi mdi-menu"></i>
                                            : <i className="ri-arrow-left-s-line"></i>
                                        }
                                    </Link>
                                    <h1 className="mb-0 flex-fill text-center font-size-14 pe-5"> {title} </h1>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const { tales, active_tale } = state.Chat;
    return { ...state.Layout, tales, active_tale };
};

export default connect(mapStateToProps)(UserHead);