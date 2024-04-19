import React, { useState, useEffect } from "react";
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';

// Constants
import { FULL_PLAN_CODE, FREE_PLAN_CODE } from "../../../constants";

// Imgs 
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { openModalSignin } from "../../../redux/actions";

// Selectors
import { selectAuth } from "../../../redux/auth/selectors";
import { selectProfiles } from "../../../redux/profiles-list/selectors";

const SidebarFooterComponent = ({ user, anyProfile }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [dropdownOpen, setdropdownOpen] = useState(false)
    const [disableOptionsProfile, setDisableOptionsProfile] = useState(false);

    const toggle = () => setdropdownOpen(!dropdownOpen);

    useEffect(() => {
        if(user?.get('id') && !anyProfile) {
            setDisableOptionsProfile(true);
            return;
        }

        setDisableOptionsProfile(false);
    }, [user, anyProfile]);

    const userMenu = user && <>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="user-dropdown" >
        <DropdownToggle tag="a">
            <div className="d-flex align-items-center">
                <div className="chat-user-img online align-self-center me-1 ms-0">
                    <div className="avatar-xs">
                        {user?.get('image') && <img src={'data:image/*;base64,' + user?.get('image')} className={`rounded avatar-xs`} alt="avatar" />}
                    </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0 ms-1">{user.get('username')}</h5>
                </div>
                <div className="flex-lg-column font-size-24">
                    <i className="ri-more-fill ms-auto"></i>
                </div>
            </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
            {!disableOptionsProfile && <>
                <DropdownItem href="/profiles"> {t('Manage Profiles')} </DropdownItem>
                <DropdownItem divider />
            </>}
            <DropdownItem href="/settings"> {t('Settings')} </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/logout"> {t('Logout')} </DropdownItem>
        </DropdownMenu>
        </Dropdown>
    </>

    const subscriptionInfo = user?.get('currentPlan')?.code !== FULL_PLAN_CODE
        ?
        <>
            {!user?.get('currentPlan') || (user.get('currentPlan').code === FREE_PLAN_CODE)
                ?
                <Link to="/subscription/plans" className="d-flex btn btn-outline-primary text-start mb-2">
                    <i className="ri-star-line me-2"></i>
                    {t('Upgrade Suscription')}
                </Link>
                :
                <>
                <p>Used {user?.get('monthStoriesCount')} of {user?.get('currentPlan')?.maxStoriesForMonth} tales.</p>

                <Link to="/subscription/plans" className="d-flex btn btn-outline-primary text-start mb-2">
                    <i className="ri-star-line me-2"></i>
                    {t('Upgrade to Plus')}
                </Link>
                </>
            }
        </>
        : ''

    const btnJoinMagicTales = <>
        <Button size="lg" color="outline-primary w-100" type="button" onClick={() => dispatch(openModalSignin())}>
            {t('Join Magic Tales')}
        </Button>
    </>

    return (
        <React.Fragment>
            <div className="flex-column mt-auto border-top p-3">
                {user
                    ?
                    <>
                        {subscriptionInfo}
                        {userMenu}
                    </>
                    :
                    <Nav className="side-menu-nav d-block">
                        <Dropdown nav isOpen={dropdownOpen} className="nav-item d-block btn-group dropup profile-user-dropdown" toggle={toggle}>
                            {btnJoinMagicTales}
                        </Dropdown>
                    </Nav>
                }
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user } = selectAuth(state);
    const profiles = selectProfiles(state);
    const anyProfile = profiles.list.size > 0;

    return { user, anyProfile };
};

export const SidebarFooter = connect(mapStateToProps, { openModalSignin })(SidebarFooterComponent);