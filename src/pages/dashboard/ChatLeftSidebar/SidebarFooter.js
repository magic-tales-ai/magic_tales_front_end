import React, { useState, useEffect } from "react";
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

//components
import { ModalSignIn } from "../../../components/Auth/Modal";

//constants
import { FULL_PLAN_CODE, FREE_PLAN_CODE } from "../../../constants";

//imgs 
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from 'react-i18next';

export const SidebarFooter = () => {
    const { t } = useTranslation();

    const selectAuthUser = createSelector(
        (state) => state.Auth,
        (auth) => ({
            user: auth?.user || null,
        })
    );

    const { user } = useSelector(selectAuthUser);
    const [dropdownOpen, setdropdownOpen] = useState(false)
    const [openModalSignIn, setOpenModalSignIn] = useState(false)

    const toggle = () => setdropdownOpen(!dropdownOpen);

    const userMenu = user && <>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="user-dropdown" >
        <DropdownToggle tag="a">
            <div className="d-flex align-items-center">
                <div className="chat-user-img online align-self-center me-1 ms-0">
                    <div className="avatar-xs">
                        <img src={avatar1} alt="user-avatar" className="profile-user rounded img-fluid" />
                    </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0 ms-1">{user.username}</h5>
                </div>
                <div className="flex-lg-column font-size-24">
                    <i className="ri-more-fill ms-auto"></i>
                </div>
            </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
            <DropdownItem href="/"> {t('Manage Profiles')} </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/"> {t('Settings')} </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="/logout"> {t('Log out')} </DropdownItem>
        </DropdownMenu>
        </Dropdown>
    </>

    const subscriptionInfo = user?.currentPlan?.code !== FULL_PLAN_CODE
        ?
        <>
            {!user?.currentPlan || (user.currentPlan.code === FREE_PLAN_CODE)
                ?
                <Link to="/subscription/plans" className="d-flex btn btn-outline-primary text-start mb-2">
                    <i className="ri-star-line me-2"></i>
                    {t('Upgrade Suscription')}
                </Link>
                :
                <>
                <p>Used {user?.stories_this_month} of {user?.currentPlan?.maxStoriesForMonth} tales.</p>

                <Link to="/subscription/plans" className="d-flex btn btn-outline-primary text-start mb-2">
                    <i className="ri-star-line me-2"></i>
                    {t('Upgrade to Plus')}
                </Link>
                </>
            }
        </>
        : ''

    const btnJoinMagicTales = <>
        <Button size="lg" color="outline-primary w-100" type="button" onClick={() => setOpenModalSignIn(true)}>
            {t('Join Magic Tales')}
        </Button>

        <ModalSignIn isOpen={openModalSignIn} setOpen={setOpenModalSignIn} defaultStep={'login'} />
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